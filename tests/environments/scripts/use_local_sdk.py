#!/usr/bin/env python3
"""
This script builds a local version of the HoneyHive SDK and updates all test environments
to use this local build instead of the published npm package. It creates a tarball of the
SDK and updates each environment's package.json to reference this local file.
"""

import re
from dotenv import dotenv_values
import yaml
import json
import os
import sys
import subprocess
from pathlib import Path
import shutil
import concurrent.futures
import time

NODE_OPTIONS = "--max-old-space-size=4096"
NPM_CONFIG_COMPRESSION = "9"
NPM_CONFIG_PROGRESS = "false"

def run_command(cmd, cwd=None, env=None):
    """Run a command and return the result with proper error handling."""
    start_time = time.time()
    # Create a copy of the current environment if none provided
    if env is None:
        env = os.environ.copy()
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd, env=env)
    duration = time.time() - start_time
    
    if result.returncode != 0:
        print(f"❌ Error running command '{' '.join(cmd)}': {result.stderr}")
        return False, result
    
    print(f"✅ Command '{' '.join(cmd)}' completed in {duration:.2f}s")
    return True, result

def process_environment(env, script_dir, tarball_name, env_vars):
    """Process a single environment in parallel."""
    env_dir = script_dir.parent / env
    print(f"🔄 Processing environment: {env}")
    
    # Copy the tarball to the environment directory
    target_tarball = env_dir / tarball_name
    shutil.copy2(script_dir.parent / tarball_name, target_tarball)
    print(f"✅ Copied {tarball_name} to {env_dir}")
    
    # Update package.json
    package_json_path = env_dir / 'package.json'
    if not package_json_path.exists():
        print(f"❌ Could not find package.json for {env} at {package_json_path}")
        return False
    
    # Read and update package.json in a single operation
    try:
        with open(package_json_path, 'r') as f:
            package_json = json.load(f)
        
        if 'dependencies' in package_json and 'honeyhive' in package_json['dependencies']:
            package_json['dependencies']['honeyhive'] = f"file:./{tarball_name}"
            
            with open(package_json_path, 'w') as f:
                json.dump(package_json, f, indent=2)
                f.write('\n')  # Add newline at end of file
            
            print(f"✅ Updated {env}/package.json to use local SDK tarball")
        else:
            print(f"⚠️ No honeyhive dependency found in {env}/package.json")
    except Exception as e:
        print(f"❌ Error updating package.json for {env}: {e}")
        return False
    
    # Clean up environment
    package_lock_path = env_dir / 'package-lock.json'
    if package_lock_path.exists():
        os.remove(package_lock_path)
        print(f"🗑️ Removed package-lock.json from {env}")
    
    node_modules_path = env_dir / 'node_modules'
    if node_modules_path.exists():
        shutil.rmtree(node_modules_path)
        print(f"🗑️ Removed node_modules from {env}")
    
    # Install dependencies with optimized settings
    npm_env = os.environ.copy()
    npm_env["NODE_OPTIONS"] = NODE_OPTIONS
    npm_env["NPM_CONFIG_COMPRESSION"] = NPM_CONFIG_COMPRESSION
    npm_env["NPM_CONFIG_PROGRESS"] = NPM_CONFIG_PROGRESS
    # Use maximum concurrency for npm operations
    npm_env["NPM_CONFIG_JOBS"] = "max"
    
    success, result = run_command(["npm", "install"], cwd=env_dir, env=npm_env)
    if not success:
        return False
    print(f"✅ Installed dependencies for {env}")
    
    # Remove the honeyhive tests directory from node_modules to reduce size
    honeyhive_tests_path = node_modules_path / 'honeyhive' / 'tests'
    if honeyhive_tests_path.exists():
        shutil.rmtree(honeyhive_tests_path)
        print(f"🗑️ Removed node_modules/honeyhive/tests from {env}")
    
    # Zip the environment with optimized settings
    success, result = run_command(["zip", "-r", "-1", f"{env}.zip", ".", "-q"], cwd=env_dir)
    if not success:
        return False
    
    print(f"📦 {env}.zip created successfully")
    # Get the size of the zip file
    zip_path = env_dir / f"{env}.zip"
    if zip_path.exists():
        zip_size = os.path.getsize(zip_path)
        # Convert to MB
        print(f"📊 Zip file size: {zip_size / (1024 * 1024):.2f} MB")

        # Remove the zip file after processing
        os.remove(zip_path)
        print(f"🗑️ Removed {zip_path} from {env}")
    else:
        print(f"⚠️ Could not find zip file at {zip_path}")

    # Update the environment variables in the Dockerfile
    update_env_variables(script_dir, env, env_vars)

    return True

def clean_artifacts(sdk_root, script_dir, patterns=['node_modules', 'package-lock.json', '*.tgz', 'dist']):
    # Clean up existing build artifacts and dependencies
    # Remove node_modules, package-lock.json, and tgz files
    os.chdir(sdk_root)
    cleanup_tasks = []
    patterns_to_delete = []
    if 'node_modules' in patterns:
        patterns_to_delete.append((sdk_root.glob('**/node_modules'), True))
    if 'package-lock.json' in patterns:
        patterns_to_delete.append((sdk_root.glob('**/package-lock.json'), False))
    if '*.tgz' in patterns:
        patterns_to_delete.append((script_dir.parent.glob('**/*.tgz'), False))
    if 'dist' in patterns:
        patterns_to_delete.append((sdk_root.glob('**/dist'), True))
    for pattern, is_dir in patterns_to_delete:
        for path in pattern:
            # Skip deeper traversal if we already found a match
            parent_has_match = False
            for existing_path, _ in cleanup_tasks:
                if path != existing_path and path.is_relative_to(existing_path):
                    parent_has_match = True
                    break
            
            if parent_has_match:
                continue
                
            if path.exists():
                cleanup_tasks.append((path, is_dir))
    
    # Run cleanup tasks concurrently
    with concurrent.futures.ThreadPoolExecutor() as executor:
        def cleanup_item(item):
            path, is_dir = item
            if not path.exists():
                print(f"⚠️ Path does not exist, skipping: {path}")
                return
            
            if is_dir:
                shutil.rmtree(path)
                print(f"🗑️ Removed node_modules from {path.parent}")
            else:
                os.remove(path)
                print(f"🗑️ Removed {path.name} from {path.parent}")
        
        list(executor.map(cleanup_item, cleanup_tasks))

def update_env_variables(script_dir, env, env_vars):
    dockerfile_path = script_dir.parent / env / 'Dockerfile'
        
    if dockerfile_path.exists():
        try:
            # Read the current Dockerfile
            with open(dockerfile_path, 'r') as f:
                dockerfile_content = f.read()
            
            # Remove existing environment variables sections
            pattern = r"\n# Environment variables from \.env file\n(ENV [^\n]+\n)+"
            cleaned_content = re.sub(pattern, "", dockerfile_content)
            
            # Find the position to insert ENV statements (after WORKDIR /app)
            lines = cleaned_content.splitlines()
            insert_position = None
            for i, line in enumerate(lines):
                if line.strip().startswith('WORKDIR /app'):
                    insert_position = i + 1
                    break
            
            if insert_position is None:
                print(f"⚠️ Could not find WORKDIR /app in {env}/Dockerfile")
                return
            
            # Create ENV statements
            env_statements = ["\n# Environment variables from .env file"]
            for key, value in env_vars.items():
                env_statements.append(f'ENV {key}="{value}"')
            env_statements.append("")
            
            # Insert ENV statements into the Dockerfile
            updated_lines = lines[:insert_position] + env_statements + lines[insert_position:]
            updated_content = "\n".join(updated_lines)
            
            # Write the updated Dockerfile
            with open(dockerfile_path, 'w') as f:
                f.write(updated_content)
            
            print(f"✅ Updated {env}/Dockerfile with environment variables")
        except Exception as e:
            print(f"❌ Error updating {env}/Dockerfile: {e}")
    else:
        print(f"❌ Could not find Dockerfile for {env}")
    

def use_local_sdk():
    """Update all environment package.json files to use a local build of the SDK."""
    start_time = time.time()
    
    # Get the directory where this script is located
    script_dir = Path(__file__).parent.absolute()
    
    # Get the SDK root directory (parent of tests directory)
    sdk_root = script_dir.parent.parent.parent.absolute()
    
    # Read the config file to get environments
    config_path = script_dir.parent / 'config.yaml'
    try:
        with open(config_path, 'r') as f:
            config = yaml.safe_load(f)
    except Exception as e:
        print(f"❌ Error reading config file: {e}")
        sys.exit(1)
    
    try:
        environments = config['environments']
    except KeyError as e:
        print(f"❌ Missing required key in config file: {e}")
        sys.exit(1)

    # Delete all node_modules, package-lock.json, and tgz files
    clean_artifacts(sdk_root, script_dir, ['node_modules', 'package-lock.json', '*.tgz', 'dist'])

    # Change to SDK root directory
    os.chdir(sdk_root)

    # Set environment variables to optimize npm pack performance
    npm_env = os.environ.copy()
    # Increase Node.js memory limit (default is 2GB)
    npm_env["NODE_OPTIONS"] = NODE_OPTIONS
    # Use maximum compression level for faster processing
    npm_env["NPM_CONFIG_COMPRESSION"] = NPM_CONFIG_COMPRESSION
    # Disable progress bar for slightly better performance
    npm_env["NPM_CONFIG_PROGRESS"] = NPM_CONFIG_PROGRESS                
    
    # Install dependencies
    print(f"🔄 Running npm install on HoneyHive SDK...")
    success, result = run_command(["npm", "install"], cwd=sdk_root, env=npm_env)
    if not success:
        print(f"❌ Error running npm install: {result.stderr}")
        sys.exit(1)
    
    # Create tarball with optimized settings
    print(f"🔄 Running optimized npm pack...")
    success, result = run_command(["npm", "pack"], cwd=sdk_root, env=npm_env)
    if not success:
        print(f"❌ Error running npm pack: {result.stderr}")
        sys.exit(1)
    
    # Get the tarball filename from the output
    tarball_name = result.stdout.strip()
    
    # Move the tarball to the environments directory
    source_path = sdk_root / tarball_name
    target_path = script_dir.parent / tarball_name
    
    if source_path.exists():
        shutil.move(source_path, target_path)
        print(f"✅ Moved {tarball_name} to environments directory")
    else:
        print(f"❌ Could not find tarball at {source_path}")
        sys.exit(1)
    
    # Get the file size of the tarball
    tarball_size = os.path.getsize(script_dir.parent / tarball_name)
    print(f"📊 Tarball size: {tarball_size / (1024 * 1024):.2f} MB")

    # Read the .env file
    env_file_path = script_dir.parent / '.env'
    try:
        env_vars = dotenv_values(env_file_path)
        if not env_vars:
            print(f"⚠️ No environment variables found in {env_file_path}")
            sys.exit(1)
    except Exception as e:
        print(f"❌ Error reading .env file: {e}")
        sys.exit(1)

    # Process environments in parallel
    print(f"🔄 Processing {len(environments)} environments in parallel...")
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(environments)) as executor:
        futures = {executor.submit(process_environment, env, script_dir, tarball_name, env_vars): env for env in environments}
        
        for future in concurrent.futures.as_completed(futures):
            env = futures[future]
            try:
                success = future.result()
                if success:
                    print(f"✅ Environment {env} processed successfully")
                else:
                    print(f"❌ Failed to process environment {env}")
            except Exception as e:
                print(f"❌ Exception while processing {env}: {e}")
    
    # Delete all node_modules, package-lock.json, and tgz files
    # clean_artifacts(sdk_root, script_dir, ['*.tgz'])

    total_time = time.time() - start_time
    print(f"✨ Done! Local SDK tarball used for all test environments in {total_time:.2f} seconds.")

if __name__ == "__main__":
    use_local_sdk() 

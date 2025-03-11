#!/usr/bin/env python3
"""
This script updates the Dockerfiles in all test environments with environment variables
from the .env file. It reads the environment variables from the .env file and adds them
as ENV statements in each environment's Dockerfile. This ensures consistent environment
configuration across all test environments.
"""

import yaml
import os
import sys
from pathlib import Path
from dotenv import dotenv_values

def update_environment_variables():
    """Update environment variables in all environment Dockerfiles."""
    # Get the directory where this script is located
    script_dir = Path(__file__).parent.absolute()
    
    # Read the config file
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
    
    print(f"Found {len(env_vars)} environment variables in .env file")
    
    # Update each environment's Dockerfile
    for env in environments:
        dockerfile_path = script_dir.parent / env / 'Dockerfile'
        
        if dockerfile_path.exists():
            try:
                # Read the current Dockerfile
                with open(dockerfile_path, 'r') as f:
                    dockerfile_lines = f.readlines()
                
                # Find the position to insert ENV statements (after WORKDIR /app)
                insert_position = None
                for i, line in enumerate(dockerfile_lines):
                    if line.strip().startswith('WORKDIR /app'):
                        insert_position = i + 1
                        break
                
                if insert_position is None:
                    print(f"⚠️ Could not find WORKDIR /app in {env}/Dockerfile")
                    continue
                
                # Create ENV statements
                env_statements = ["\n# Environment variables from .env file\n"]
                for key, value in env_vars.items():
                    env_statements.append(f'ENV {key}="{value}"\n')
                env_statements.append("\n")
                
                # Insert ENV statements into the Dockerfile
                updated_dockerfile = dockerfile_lines[:insert_position] + env_statements + dockerfile_lines[insert_position:]
                
                # Write the updated Dockerfile
                with open(dockerfile_path, 'w') as f:
                    f.writelines(updated_dockerfile)
                
                print(f"✅ Updated {env}/Dockerfile with environment variables")
            except Exception as e:
                print(f"❌ Error updating {env}/Dockerfile: {e}")
        else:
            print(f"❌ Could not find Dockerfile for {env}")
    
    print("Done!")

if __name__ == "__main__":
    update_environment_variables() 
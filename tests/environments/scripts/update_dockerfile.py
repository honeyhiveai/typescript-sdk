#!/usr/bin/env python3
"""
This script updates Dockerfiles in test environments to use a local SDK package.
It modifies each environment's Dockerfile to copy and install the local SDK tarball
instead of downloading it from npm. This allows testing changes to the SDK before
they are published.
"""

import os
import sys
import re
import yaml
from pathlib import Path

def update_dockerfiles():
    """Update Dockerfiles to copy and use local SDK package."""
    # Get the directory where this script is located
    script_dir = Path(__file__).parent.absolute()
    
    # Get the SDK root directory (parent of tests directory)
    sdk_root = script_dir.parent.parent.absolute()
    
    # Read the config file to get environments
    config_path = script_dir.parent / 'config.yaml'
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    
    environments = config['environments']
    
    # Get the tarball name (assuming it exists)
    tarballs = list(sdk_root.glob('honeyhive-*.tgz'))
    if not tarballs:
        print("❌ No SDK tarball found. Run 'make use-local-sdk' first.")
        sys.exit(1)
    
    tarball_name = tarballs[0].name
    
    # Update each environment's Dockerfile
    for env in environments:
        dockerfile_path = script_dir.parent / env / 'Dockerfile'
        
        if dockerfile_path.exists():
            with open(dockerfile_path, 'r') as f:
                dockerfile_content = f.read()
            
            # Check if the Dockerfile already has been modified
            if f"COPY {tarball_name}" in dockerfile_content:
                print(f"⚠️ Dockerfile in {env} already updated")
                continue
            
            # Modify the Dockerfile to copy and use the local package
            modified_content = dockerfile_content
            
            # Add copying the tarball after copying package.json
            copy_package_pattern = r'(COPY package\.json ./\n)'
            modified_content = re.sub(
                copy_package_pattern,
                f"\\1\n# Copy local SDK package\nCOPY {tarball_name} ./\n",
                modified_content
            )
            
            # Modify npm install to use the local package
            npm_install_pattern = r'(RUN npm install)'
            modified_content = re.sub(
                npm_install_pattern,
                f"\\1 ./{tarball_name} --no-save",
                modified_content
            )
            
            # Write the updated Dockerfile
            with open(dockerfile_path, 'w') as f:
                f.write(modified_content)
            
            print(f"✅ Updated Dockerfile in {env}")
        else:
            print(f"❌ Could not find Dockerfile for {env}")
    
    print("Done! Dockerfiles updated to use local SDK package.")

if __name__ == "__main__":
    update_dockerfiles() 
#!/usr/bin/env python3
"""
This script updates the HoneyHive SDK version in all test environment package.json files.
It reads the desired version from the config.yaml file and updates each environment's
package.json to use that version. This ensures consistent SDK versioning across all
test environments.
"""

import yaml
import json
import os
import sys
from pathlib import Path

def update_package_versions():
    """Update HoneyHive version in all environment package.json files."""
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
        honeyhive_version = config['honeyhiveVersion']
        environments = config['environments']
    except KeyError as e:
        print(f"❌ Missing required key in config file: {e}")
        sys.exit(1)
    
    print(f"Updating HoneyHive version to {honeyhive_version} in all environments...")
    
    # Update each environment's package.json
    for env in environments:
        package_json_path = script_dir.parent / env / 'package.json'
        
        if package_json_path.exists():
            try:
                with open(package_json_path, 'r') as f:
                    package_json = json.load(f)
                
                # Update the honeyhive dependency version
                if 'dependencies' in package_json and 'honeyhive' in package_json['dependencies']:
                    package_json['dependencies']['honeyhive'] = honeyhive_version
                    
                    # Write the updated package.json
                    with open(package_json_path, 'w') as f:
                        json.dump(package_json, f, indent=2)
                        f.write('\n')  # Add newline at end of file
                    
                    print(f"✅ Updated {env}/package.json")
                else:
                    print(f"⚠️ No honeyhive dependency found in {env}/package.json")
            except Exception as e:
                print(f"❌ Error updating {env}/package.json: {e}")
        else:
            print(f"❌ Could not find package.json for {env}")
    
    print("Done!")

if __name__ == "__main__":
    update_package_versions() 
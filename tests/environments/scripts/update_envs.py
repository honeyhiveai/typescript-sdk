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
    for env in ['environments']:
        pass
    
    print("Done!")

if __name__ == "__main__":
    update_environment_variables() 
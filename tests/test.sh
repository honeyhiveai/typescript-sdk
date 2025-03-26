#!/bin/bash

# Check if all arguments are provided
if [ $# -ne 3 ]; then
    echo "Usage: ./test.sh <target> <file> <env>"
    echo "\nAvailable targets:"
    echo "  dev"
    echo "  test"
    echo "\nAvailable environments:"
    echo "$(ls -1 environments | grep -v "\.ts$")"
    echo "\nExample: ./test.sh dev integration/evaluation.ts commonjs-commonjs"
    exit 1
fi

TARGET=$1
FILE=$2
ENV=$3

# Validate target
if [ "$TARGET" != "dev" ] && [ "$TARGET" != "test" ]; then
    echo "Error: Target must be either 'dev' or 'test'"
    exit 1
fi

# Validate environment
if [ ! -d "environments/$ENV" ]; then
    echo "Error: Environment '$ENV' not found"
    exit 1
fi

make $TARGET FILE=$FILE ENV=$ENV
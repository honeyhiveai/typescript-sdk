#!/bin/bash

# Check if all arguments are provided
if [ $# -lt 2 ] || [ $# -gt 3 ]; then
    echo "Usage: ./test.sh <target> <file> [<env>]"
    echo "\nAvailable targets:"
    echo "  dev"
    echo "  test"
    echo "  local"
    echo "  lambda"
    echo "\nAvailable environments:"
    echo "$(ls -1 environments | grep -v "\.ts$")"
    echo "\nExample: ./test.sh dev integration/evaluation.ts commonjs-commonjs"
    echo "Example: ./test.sh lambda integration/lambda_handler.ts commonjs-nodejs"
    echo "\nIf env is not specified, module-esnext will be used by default."
    exit 1
fi

TARGET=$1
FILE=$2
ENV=${3:-module-esnext}  # Default to module-esnext if not specified

# Validate target
if [ "$TARGET" != "dev" ] && [ "$TARGET" != "test" ] && [ "$TARGET" != "local" ] && [ "$TARGET" != "lambda" ]; then
    echo "Error: Target must be either 'dev', 'test', 'local', or 'lambda'"
    exit 1
fi

# Validate environment
if [ ! -d "environments/$ENV" ]; then
    echo "Error: Environment '$ENV' not found"
    exit 1
fi

make $TARGET FILE=$FILE ENV=$ENV
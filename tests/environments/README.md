# HoneyHive SDK Test Environments

This directory contains test environments for the HoneyHive TypeScript SDK in different Node.js configurations.

## Available Test Environments

- `cjs-env`: CommonJS environment test
- `esm-env`: ES Modules environment test

## Running Tests

You can run the tests using the provided Makefile:

```bash
# Run all tests
make all

# Run only CommonJS test
make cjs-test

# Run only ESM test
make esm-test

# Clean up Docker images
make clean
```

## Test Environment Structure

Each test environment contains:

1. `package.json` - Defines dependencies and module type
2. `tsconfig.json` - TypeScript configuration
3. `index.js` - Simple test script
4. `Dockerfile` - Docker configuration for isolated testing

## Local SDK Testing

For testing with a local build of the SDK, you would typically:

1. Build the SDK locally
2. Use npm link or a local file path in package.json

However, for the initial setup, we're using the published version from npm:

```json
"dependencies": {
  "honeyhive": "^1.0.0"
}
```

## Future Improvements

For testing with a local build, consider:

1. Volume mounting the local SDK build into the Docker container
2. Using npm pack to create a tarball and installing it locally
3. Setting up a local npm registry for testing 
# HoneyHive SDK Tests

This directory contains tests for the HoneyHive TypeScript SDK.

## OpenAI Tests

The `openai-test` directory contains examples of using the HoneyHive SDK with OpenAI in both CommonJS TypeScript (CTS) and ECMAScript Module TypeScript (MTS) formats.

### Running Tests with Docker

The easiest way to run the tests is using Docker Compose:

```bash
# From the tests directory
docker-compose up --build
```

This will build the Docker image and run both the CTS and MTS versions of the OpenAI test.

### Running Tests Locally

To run the tests locally, you'll need to set the following environment variables:

```bash
export HH_API_KEY="your_honeyhive_api_key"
export HH_PROJECT_NAME="your_project_name"
export HH_API_URL="https://api.honeyhive.ai" # or your custom URL
export OPENAI_API_KEY="your_openai_api_key"
```

Then you can run the tests:

```bash
# Run the CommonJS version
npx ts-node openai-test/openai_test.cts

# Run the ESM version
npx tsx openai-test/openai_test.mts
```

## Test Structure

- `openai-test/utils.ts` - Shared utilities used by both CTS and MTS versions
- `openai-test/openai_test.cts` - CommonJS TypeScript version
- `openai-test/openai_test.mts` - ECMAScript Module TypeScript version
- `run_tests.sh` - Shell script to run both test versions in Docker
- `Dockerfile` - Docker configuration for running the tests
- `docker-compose.yml` - Docker Compose configuration for easier test execution 
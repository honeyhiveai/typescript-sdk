.PHONY: all test cjs-test esm-test use-local-sdk update-dockerfile

all: use-local-sdk

# Use local SDK build for testing
use-local-sdk:
	@echo "Setting up environments to use local SDK build..."
	@python3 ./scripts/use_local_sdk.py

# Run all tests
test:
	@echo "Running all tests in parallel..."
	@make cjs-test & make esm-test & wait

# Test CommonJS environment
cjs-test:
	@echo "Running CommonJS environment test..."
	cd cjs-env && docker build -t honeyhive-sdk-test-cjs . && docker run --rm honeyhive-sdk-test-cjs

# Test ESM environment
esm-test:
	@echo "Running ESM environment test..."
	cd esm-env && docker build -t honeyhive-sdk-test-esm . && docker run --rm honeyhive-sdk-test-esm

# Clean up docker images
clean:
	docker rmi honeyhive-sdk-test-cjs honeyhive-sdk-test-esm || true 
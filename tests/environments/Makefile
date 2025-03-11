.PHONY: all cjs-test esm-test update-versions use-local-sdk update-dockerfile

all:
	@echo "Running all tests in parallel..."
	@make cjs-test & make esm-test & wait

# Update HoneyHive version in all environments
update-versions:
	@echo "Updating HoneyHive versions..."
	@python3 ./scripts/update_versions.py

# Use local SDK build for testing
use-local-sdk:
	@echo "Setting up environments to use local SDK build..."
	@python3 ./scripts/use_local_sdk.py

# Update Dockerfiles to use local SDK
update-dockerfile:
	@echo "Updating Dockerfiles to use local SDK..."
	@python3 ./scripts/update_dockerfile.py

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
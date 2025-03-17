.PHONY: test build clean test-local

# Run the tests using Docker
test:
	docker build -f tests/Dockerfile -t honeyhive-tests .
	docker run --rm honeyhive-tests

# Build the Docker image without running it
build:
	docker build -f tests/Dockerfile -t honeyhive-tests .

# Clean up Docker resources
clean:
	docker rmi honeyhive-tests || true

# Publish the package
publish:
	npm version patch && npm publish

# Run the tests locally (without Docker)
test-local:
	cd tests/openai-test && npm test

# Default target
.DEFAULT_GOAL := help

# Declare phony targets
.PHONY: help clean test

# Help target
help:
	@echo "Usage: make test FILE=<test-file> ENV=<environment>"
	@echo "Example: make test FILE=evaluation.ts ENV=commonjs-commonjs"
	@echo ""
	@echo "Available environments:"
	@ls -d environments/*/ | sed 's/environments\///g' | sed 's/\///g'

# Function to extract code between PATCH markers and sandwich it between bootstrap code
define extract_and_patch
	@echo "Creating patched file..."
	@awk '                                    \
		BEGIN { p = 0; }                      \
		FILENAME == ARGV[1] && !p {print}     \
		FILENAME == ARGV[1] && /\/\/ <\/patch>/ {p = 1; next} \
		FILENAME == ARGV[1] && p {after = after ORS $$0}      \
		FILENAME == ARGV[2] {print}           \
		END {print after}                     \
	' environments/bootstrap.ts $(1) > environments/$(2)/index.ts
endef

# Function to build and run tests
define build_and_run
	@echo "Setting up test environment..."
	@if [ ! -f honeyhive.tgz ]; then \
		echo "Building package..." && \
		cd .. && npm pack && \
		mv honeyhive-*.tgz tests/honeyhive.tgz && \
		cd tests; \
	fi
	@echo "Copying files to $(2)..."
	@cp honeyhive.tgz environments/$(2)/
	@cp Dockerfile environments/$(2)/
	@echo "Building and running Docker container..."
	@cd environments/$(2) && docker build -t typescript-sdk-$(2) . && docker run --rm --env-file ../../.env typescript-sdk-$(2)
	@echo "Cleaning up Docker image..."
	@docker rmi typescript-sdk-$(2)
	@echo "Cleaning up environment..."
	@rm -f \
		environments/$(2)/honeyhive.tgz \
		environments/$(2)/Dockerfile
endef

# Test target
test:
	@if [ -z "$(FILE)" ] || [ -z "$(ENV)" ]; then \
		echo "Error: Both FILE and ENV must be specified."; \
		echo "Usage: make test FILE=<test-file> ENV=<environment>"; \
		exit 1; \
	fi
	$(call extract_and_patch,$(FILE),$(ENV))
	$(call build_and_run,$(FILE),$(ENV))

dev:
	@if [ -z "$(FILE)" ] || [ -z "$(ENV)" ]; then \
		echo "Error: Both FILE and ENV must be specified."; \
		echo "Usage: make test FILE=<test-file> ENV=<environment>"; \
		exit 1; \
	fi
	@echo "Building package in root directory..."
	@cd .. && npm run build && cd tests
	$(call extract_and_patch,$(FILE),$(ENV))
	$(call build_and_run,$(FILE),$(ENV))

# Clean target
clean:
	@echo "Cleaning up..."
	@rm -f honeyhive.tgz
	@for dir in environments/*/; do \
		rm -f $$dir/honeyhive.tgz; \
		rm -f $$dir/index.ts; \
		rm -f $$dir/Dockerfile; \
	done 
# Default target
.DEFAULT_GOAL := help

# Declare phony targets
.PHONY: help clean test dev local lambda

# Helper function to check required parameters
define check_params
	@if [ -z "$(FILE)" ] || [ -z "$(ENV)" ]; then \
		echo "Error: Both FILE and ENV must be specified."; \
		echo "Usage: make test FILE=<test-file> ENV=<environment>"; \
		exit 1; \
	fi
	@echo "Building env: $(ENV)"
	@echo "Entry script: $(FILE)"
endef

# Help target
help:
	@echo "Usage: make test FILE=<test-file> ENV=<environment>"
	@echo "Example: make test FILE=evaluation.ts ENV=commonjs-commonjs"
	@echo "Example: make lambda FILE=lambda_handler.ts ENV=commonjs-nodejs"
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

# Function to extract code and sandwich it for Lambda deployment
define extract_and_patch_lambda
	@echo "Creating Lambda-patched file..."
	@awk '                                    \
		BEGIN { p = 0; }                      \
		FILENAME == ARGV[1] && !p {print}     \
		FILENAME == ARGV[1] && /\/\/ <\/patch>/ {p = 1; next} \
		FILENAME == ARGV[1] && p {after = after ORS $$0}      \
		FILENAME == ARGV[2] {print}           \
		END {print after}                     \
	' environments/bootstrapLambda.ts $(1) > environments/$(2)/index.ts
endef

# Function to build and run tests
define build_and_run
	@echo "Setting up test environment..."
	@if [ ! -f honeyhive.tgz ]; then \
		echo "Building package..." && \
		cd .. && npm pack --quiet && \
		mv honeyhive-*.tgz tests/honeyhive.tgz && \
		cd tests; \
	fi
	@echo "Copying files to $(2)..."
	@cp honeyhive.tgz environments/$(2)/
	@cp Dockerfile environments/$(2)/
	@cp .env environments/$(2)/
	@echo "Building and running Docker container..."
	@cd environments/$(2) && docker build -t typescript-sdk-$(2) . && docker run --rm --env-file ../../.env typescript-sdk-$(2)
	@echo "\n----------------------------------------"
	@echo "Cleaning up Docker image..."
	@docker rmi typescript-sdk-$(2)
	@echo "Cleaning up environment..."
	@rm -f \
		environments/$(2)/honeyhive.tgz \
		environments/$(2)/Dockerfile \
		environments/$(2)/.env
endef

define build_and_run_local
	@echo "Setting up test environment..."
	@if [ ! -f honeyhive.tgz ]; then \
		echo "Building package..." && \
		cd .. && npm pack && \
		mv honeyhive-*.tgz tests/honeyhive.tgz && \
		cd tests; \
	fi
	@echo "Copying files to $(2)..."
	@cp honeyhive.tgz environments/$(2)/
	@cp .env environments/$(2)/
	@echo "Installing dependencies and running test locally..."
	@cd environments/$(2) && \
		npm install ./honeyhive.tgz --verbose --no-cache && \
		npm install openai --verbose && \
		npm install --verbose && \
		npm run test -- --env-file=.env
endef

define build_lambda_package
	@echo "Setting up lambda deployment environment..."
	@if [ ! -f honeyhive.tgz ]; then \
		echo "Building package..." && \
		cd .. && npm pack && \
		mv honeyhive-*.tgz tests/honeyhive.tgz && \
		cd tests; \
	fi
	@echo "Copying files to $(2)..."
	@cp honeyhive.tgz environments/$(2)/
	@cp .env environments/$(2)/
	@echo "Installing dependencies and building Lambda package..."
	@cd environments/$(2) && \
		npm install ./honeyhive.tgz --no-cache && \
		npm install dotenv --no-save && \
		npm run build && \
		mkdir -p lambda-build && \
		cp -r ./dist/* ./lambda-build/ && \
		mkdir -p lambda-build/node_modules && \
		cp -r ./node_modules/honeyhive lambda-build/node_modules/ && \
		cp -r ./node_modules/dotenv lambda-build/node_modules/ && \
		cp .env ./lambda-build/ && \
		cd lambda-build && \
		zip -rq ../lambda.zip . && \
		cd .. && \
		rm -rf lambda-build
	@echo "\n----------------------------------------"
	@echo "Lambda deployment package created at: environments/$(2)/lambda.zip"
	@echo "Package size: $$(du -h environments/$(2)/lambda.zip | cut -f1)"
	@echo "Upload this file to AWS Lambda and set the handler to 'index.handler'"
endef

# Test target
test:
	$(call check_params)
	$(call extract_and_patch,$(FILE),$(ENV))
	$(call build_and_run,$(FILE),$(ENV))

dev:
	$(call check_params)
	@echo "Building package in root directory..."
	@cd .. && npm run build && rm -f honeyhive*.tgz && cd tests && rm -f honeyhive.tgz
	$(call extract_and_patch,$(FILE),$(ENV))
	$(call build_and_run,$(FILE),$(ENV))

local:
	$(call check_params)
	@echo "Building package in root directory..."
	@cd .. && npm run build && rm -f honeyhive*.tgz && cd tests && rm -f honeyhive.tgz
	$(call extract_and_patch,$(FILE),$(ENV))
	$(call build_and_run_local,$(FILE),$(ENV))

lambda:
	$(call check_params)
	@echo "Building package in root directory..."
	@cd .. && npm run build && rm -f honeyhive*.tgz && cd tests && rm -f honeyhive.tgz
	$(call extract_and_patch_lambda,$(FILE),$(ENV))
	$(call build_lambda_package,$(FILE),$(ENV))

# Clean target
clean:
	@echo "Cleaning up..."
	@rm -f honeyhive.tgz
	@for dir in environments/*/; do \
		rm -f $$dir/honeyhive.tgz; \
		rm -f $$dir/index.ts; \
		rm -f $$dir/Dockerfile; \
		rm -f $$dir/.env; \
		rm -f $$dir/lambda.zip; \
	done 
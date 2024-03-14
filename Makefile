.PHONY: test

# The names of the required environment variables
REQUIRED_ENV_VARS := HH_API_KEY HH_PROJECT OPENAI_API_KEY SERP_API_KEY

# Function to check whether an environment variable is set
env_var_check = $(if $(value $(1)),,$(error $(1) is not set. Please set $(1)))

# The test target
test:
	@$(foreach var,$(REQUIRED_ENV_VARS),$(call env_var_check,$(var)))
	@docker build -f tests/Dockerfile . -t my-test
	@docker run -e HH_API_KEY=$$HH_API_KEY -e HH_PROJECT="$$HH_PROJECT" -e SERP_API_KEY=$$SERP_API_KEY -e OPENAI_API_KEY=$$OPENAI_API_KEY -t my-test

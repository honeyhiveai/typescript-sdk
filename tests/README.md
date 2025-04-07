# Integration Testing

Run `integration/openai_trace.ts` script in CommonJS environment (`/environment/commonjs-commonjs`) in an isolated Docker container using this command:

```bash
./test.sh test integration/openai_trace.ts commonjs-commonjs
```

For development, you can use the `dev` target which first builds the package in the root directory:

```bash
./test.sh dev integration/openai_trace.ts commonjs-commonjs
```

For AWS Lambda deployment, you can use the `lambda` target to create a deployment package:

```bash
./test.sh lambda integration/lambda_handler.ts commonjs-nodejs
```

This will create a lambda.zip file in the environment directory which you can upload to AWS Lambda.

# Overview

Integration testing in JavaScript/TypeScript requires testing across multiple environments with different configurations and dependency versions. Our approach:

1. Pack current SDK state into a tarball
2. Port environment configs (.env, Dockerfile) to test environment
3. Use bootstrap code to patch integration test files (which export `main: async (): Promise<void>`)
4. Run in Docker containers optimized for fast builds

# Tests Structure

```
.
├── src/
│   └── ...
└── tests/
    ├── .env
    ├── Dockerfile
    ├── Makefile
    ├── test.sh
    ├── README.md
    ├── environments/
    │   ├── bootstrap.ts            # Standard bootstrap for tests
    │   ├── bootstrapLambda.ts      # Special bootstrap for Lambda
    │   ├── commonjs-commonjs/
    │   ├── esm-commonjs/
    │   └── ...
    └── integration/
        ├── openai_trace.ts
        ├── lambda_handler.ts
        └── ...
```

# How to Test a Script in an Environment

1. View available environments:
```bash
./test.sh
```

2. Run test:
```bash
./test.sh test integration/openai_trace.ts commonjs-commonjs
```

This will patch the test file with bootstrap code and run it in the specified environment's Docker container. 

Note: If you don't specify an environment, it will default to `module-esnext`.

# AWS Lambda Deployment

To prepare a deployment package for AWS Lambda:

```bash
./test.sh lambda integration/lambda_handler.ts commonjs-nodejs
```

This will:
1. Build the SDK from the current state of the repository
2. Install dependencies including aws-lambda types
3. Use the special bootstrapLambda.ts to wrap your code
4. Transpile TypeScript to JavaScript
5. Create a deployment package (`lambda.zip`) in your chosen environment directory
6. Structure the package with the handler at the root level

After running the command, upload the generated `lambda.zip` file to AWS Lambda and set the handler to `index.handler`.

## Lambda Integration Flow

The Lambda deployment process follows these steps:

1. Your script exports a `main()` function (just like regular tests)
2. The bootstrapLambda.ts file wraps your script
3. If your script already exports a `handler`, it will be preserved
4. Otherwise, a new handler is created that invokes your `main()` function
5. The final handler conforms to the AWS Lambda interface
6. Local testing is supported via a mock execution environment

This approach allows you to write standard HoneyHive instrumented code and easily deploy it to AWS Lambda without manual configuration.


# Development

Make sure you are setup (see above)

There are 3 parts to development:

1. Setup
2. Running a script in an environment
3. Changing the SDK, script, env variables, package.json, tsconfig, dependencies, etc


## 1. Setup

First, let's set up:

Enable intellisense: (optional but useful for development)
- run `npm link honeyhive && npm run build` in the root directory (symlinks honeyhive globally to current state of repo)
- globally install any dependencies in your script (for ex: `npm install -g openai`)

Set env variables in .env
- Required are: HH_API_KEY, HH_PROJECT
- add others OPENAI_API_KEY etc

Set your dependendencies in the Dockerfile
- add `npm install <package>` statements to the Dockerfile so that your script's dependencies are injected

## 2. Running
Set FILE to the path of the script and ENV to the name of the environment (folder name in environments):

```bash
./test.sh test integration/openai_trace.ts commonjs-commonjs
```

For development (which ensures the package is built first):

```bash
./test.sh dev integration/openai_trace.ts commonjs-commonjs
```

For Lambda deployment:

```bash
./test.sh lambda integration/lambda_handler.ts commonjs-nodejs
```

The `dev` and `lambda` targets ensure the package is built first before running the test or creating the deployment package.

## 3. Changing
### Change to SDK
- first build the current version from root to ensure no errors `npm run build` (optional)
- delete the honeyhive.tgz file in tests if it exists (this will trigger re-packing)
- intellisense/typing should catch up if you've done the setup above
- alternatively, use the `dev` target instead of `test` which will automatically build the package first

### Changes to .env
Make directly to .env

### Changes to tsconfig / package
Make directly to that environment's tsconfig or package.json

### Add/remove dependencies
Change in Dockerfile or package.json. Both will work

### Make a new environment
Simply copy paste a directory and follow same structure (package.json + tsconfig.json). Those are the only 2 files needed. The naming convention used is `<package module type>-<tsconfig module>`

Then run the test command with the new environment:

```bash
./test.sh test integration/openai_trace.ts your-new-environment
```

### Make a new script / edit existing script
- write your Typescript script in the /integration folder
- make sure you export a main method which follows the signature: async (): Promise<void>
- make sure to flush (else the program will end before OTEL can export everything)

### Creating Lambda handlers
For AWS Lambda handlers, there are two approaches:

1. Simple approach (recommended):
   - Export a `main()` function following the standard testing pattern
   - The bootstrapLambda.ts file will automatically wrap it for Lambda
   - The resulting handler will call your main function and provide proper responses

2. Advanced approach:
   - Export both a `main()` function and a `handler()` function
   - The `handler()` should follow the Lambda signature
   - When using the lambda target, your handler will be preserved and used directly

Either way, the script will be properly wrapped for AWS Lambda, with the correct types and structure.


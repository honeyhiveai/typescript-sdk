# Integration Testing

Run `integration/openai_trace.ts` script in CommonJS environment (`/environment/commonjs-commonjs`) in an isolated Docker container using this command:

```bash
make test FILE=integration/openai_trace.ts ENV=commonjs-commonjs
```

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
    ├── README.md
    ├── environments/
    │   ├── commonjs-commonjs/
    │   ├── esm-commonjs/
    │   └── ...
    └── integration/
        ├── openai_trace.ts
        └── ...
```

# How to Test a Script in an Environment

1. View available environments:
```bash
make help
# or
ls environments/
```

2. Run test:
```bash
make test FILE=integration/openai_trace.ts ENV=commonjs-commonjs
```

This will patch the test file with bootstrap code and run it in the specified environment's Docker container. 


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
Set FILE to the path of the script
Set ENV to the name of the environment (folder name in environments)

Then run
```bash
make test FILE=integration/openai_trace.ts ENV=commonjs-commonjs
```

## 3. Changing
### Change to SDK
- first build the current version from root to ensure no errors `npm run build` (optional)
- delete the honeyhive.tgz file in tests if it exists (this will trigger re-packing)
- intellisense/typing should catch up if you've done the setup above

### Changes to .env
Make directly to .env

### Changes to tsconfig / package
Make directly to that environment's tsconfig or package.json

### Add/remove dependencies
Change in Dockerfile or package.json. Both will work

### Make a new environment
Simply copy paste a directory and follow same structure (package.json + tsconfig.json). Those are the only 2 files needed. The naming convention used is `<package module type>-<tsconfig module>`


Then run the `make test` command with the new environment.

### Make a new script / edit existing script
- write your Typescript script in the /integration folder
- make sure you export a main method which follows the signature: async (): Promise<void>
- make sure to flush (else the program will end before OTEL can export everything)


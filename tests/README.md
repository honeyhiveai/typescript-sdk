# HoneyHive SDK Tests

This directory contains test scripts and configurations for the HoneyHive SDK. It's set up as a separate package that depends on the parent SDK package for development and testing purposes.

## Directory Structure

```
typescript-sdk/
├── src/           # Main SDK source code
├── tests/         # Test directory (this)
│   ├── package.json    # Test package configuration
│   ├── tsconfig.json   # Test TypeScript configuration
│   └── *.ts           # Test scripts
├── tsconfig.json  # Main SDK TypeScript configuration
└── package.json   # Main SDK package configuration
```

## Configuration

### Main SDK Package (parent)
The main SDK package is configured in the parent directory's `package.json`:
- Outputs compiled code to `dist/` directory
- Generates type definitions (`.d.ts` files)
- Excludes the `tests` directory from the published package

The main `tsconfig.json` in the parent directory:
- Configures strict type checking for the SDK
- Outputs to `dist/` directory
- Excludes test files and build artifacts
- Enables source maps and declaration files
- Uses Node16 module resolution

### Test Package (this directory)
The test package is configured to:
- Use the local SDK package via `"honeyhive": "file:.."` dependency
- Resolve types from the parent package's `dist` directory
- Support both development and test modes
- Use a more relaxed TypeScript configuration for testing

The test `tsconfig.json`:
- Inherits module resolution settings from the parent
- Uses a more permissive type checking configuration
- Maps the `honeyhive` package to the parent's `dist` directory
- Enables source maps for debugging

## Available Scripts

From the `tests` directory, you can run:

```bash
# Development mode with hot reloading of the script (but not honeyhive)
npm run dev <script.ts>

# Test mode (clean honeyhive and script build)
npm run test <script.ts>

# Direct ts-node execution
npm run ts-node <script.ts>
```

Example:
```bash
# Run openai_test.ts in development mode
npm run dev openai_test.ts

# Run openai_test.ts in test mode
npm run test openai_test.ts
```

## Development Workflow

1. **Development Mode**
   - Uses `ts-node-dev` for hot reloading
   - Automatically rebuilds parent package
   - Watches for changes in both test files and SDK source
   - Best for active development

2. **Test Mode**
   - Performs a clean build of both packages
   - Runs the script once
   - Best for verifying changes or running tests

## Troubleshooting

### Type Resolution Issues
If you see type errors or changes not reflecting:
1. Ensure the parent package is built:
   ```bash
   cd .. && npm run build
   ```
2. Check that the `dist` directory exists in the parent package
3. Verify the path mapping in `tsconfig.json` points to `../dist`
4. Make sure both tsconfig files are properly configured

### Build Issues
If you encounter build errors:
1. Clean both packages:
   ```bash
   cd .. && npm run clean
   cd tests && rm -rf node_modules
   ```
2. Reinstall dependencies:
   ```bash
   cd .. && npm install
   cd tests && npm install
   ```
3. Rebuild:
   ```bash
   cd .. && npm run build
   cd tests && npm run build
   ```

### Environment Variables
Make sure required environment variables are set:
- `HH_API_KEY`
- `HH_API_URL`
- `HH_PROJECT_NAME`
- `OPENAI_API_KEY`

### Hot Reloading Not Working
If changes aren't being reflected in development mode:
1. Check that `ts-node-dev` is running (you should see the watcher output)
2. Ensure you're using the `dev` script, not `test`
3. Try stopping and restarting the development server

## Best Practices

1. **Development**
   - Use `npm run dev` during active development
   - Changes to both SDK and test files will trigger rebuilds
   - Console output will show build status

2. **Testing**
   - Use `npm run test` for final verification
   - This ensures a clean build and proper type checking
   - Best for catching issues before committing

3. **Type Checking**
   - The setup ensures type checking across both packages
   - Changes to SDK types will be reflected in tests
   - Use TypeScript's type checking to catch issues early
   - Note that test files use a more permissive type checking configuration

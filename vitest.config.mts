import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Environment
    environment: 'node',

    // Test patterns
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**'],

    // Timeouts for integration tests (need time for retry logic)
    testTimeout: 30000, // 30 seconds per test
    hookTimeout: 10000, // 10 seconds for setup/teardown

    // Isolation
    isolate: true,

    // Environment variables
    env: {
      NODE_ENV: 'test',
    },

    // Sequential for integration tests to avoid rate limits
    sequence: {
      shuffle: false,
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

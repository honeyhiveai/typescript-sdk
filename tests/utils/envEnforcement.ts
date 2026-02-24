import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

/**
 * Enforce .env file loading for local development.
 * Matches Python's enforce_local_env_file pattern.
 */
export function enforceLocalEnvFile(): void {
  // Check if running in CI (GitHub Actions sets CI=true)
  if (process.env.CI) {
    console.log('Running in CI environment - using environment variables directly');
    return;
  }

  // Look for .env file in SDK root
  const envPath = path.resolve(__dirname, '../../.env');

  if (!fs.existsSync(envPath)) {
    console.warn(
      `⚠️  WARNING: .env file not found at ${envPath}\n` +
        'For local development, create a .env file with:\n' +
        '  HH_API_KEY=your_key_here\n' +
        '  HH_PROJECT=your_project\n' +
        '  HH_API_URL=https://api.honeyhive.ai'
    );
    return;
  }

  // Load environment variables
  dotenv.config({ path: envPath });
  console.log('✅ Loaded environment variables from .env file');
}

/**
 * Enforce required integration test credentials.
 * Matches Python's enforce_integration_credentials pattern.
 */
export function enforceIntegrationCredentials(): {
  apiKey: string;
  project: string;
  source: string;
  apiUrl: string;
} {
  // First try to load from .env
  enforceLocalEnvFile();

  const apiKey = process.env.HH_API_KEY;
  const project = process.env.HH_PROJECT || 'test-project';
  const source = process.env.HH_SOURCE || 'typescript-integration-test';
  const apiUrl = process.env.HH_API_URL || 'https://api.honeyhive.ai';

  if (!apiKey) {
    throw new Error(
      'HH_API_KEY environment variable is required for integration tests.\n' +
        'Set it in your .env file or environment.'
    );
  }

  return { apiKey, project, source, apiUrl };
}

/**
 * Get real API credentials for integration tests
 */
export function getRealApiCredentials() {
  return enforceIntegrationCredentials();
}

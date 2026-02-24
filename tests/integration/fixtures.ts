import { beforeEach, afterEach } from 'vitest';
import { HoneyHive } from '../../src/sdk/sdk';
import { HoneyHiveTracer } from '../../src/sdk/tracer';
import { getRealApiCredentials } from '../utils/envEnforcement';

/**
 * Integration test fixtures matching Python conftest.py patterns
 */

let integrationClient: HoneyHive | null = null;
let integrationTracer: HoneyHiveTracer | null = null;

/**
 * Get or create integration client (session-scoped in Python)
 */
export function getIntegrationClient(): HoneyHive {
  if (!integrationClient) {
    const { apiKey, apiUrl } = getRealApiCredentials();
    integrationClient = new HoneyHive({
      bearerAuth: apiKey,
      serverURL: apiUrl,
    });
  }
  return integrationClient;
}

/**
 * Create fresh integration tracer for each test (function-scoped in Python)
 * IMPORTANT: This must be async because init() is async
 */
export async function createIntegrationTracer(): Promise<HoneyHiveTracer> {
  const { apiKey, project, source, apiUrl } = getRealApiCredentials();

  // Generate unique session name per test
  const workerId = process.env.VITEST_WORKER_ID || 'master';
  const timestamp = Date.now() * 1000; // microseconds like Python
  const sessionName = `test-${workerId}-${timestamp}`;

  // Use init() instead of constructor - it calls startSession() and initializes traceloop
  const tracer = await HoneyHiveTracer.init({
    apiKey,
    project,
    source,
    sessionName,
    serverUrl: apiUrl,
    disableBatch: true, // For immediate API calls in tests
    verbose: false,
  });

  return tracer;
}

/**
 * Setup integration tracer with automatic cleanup
 */
export function setupIntegrationTracer() {
  let tracer: HoneyHiveTracer;

  beforeEach(async () => {
    tracer = await createIntegrationTracer();
  });

  afterEach(async () => {
    if (tracer) {
      try {
        await tracer.flush();
        // Note: Add shutdown method if available
      } catch (error) {
        // Silent failure - cleanup is best effort
      }
    }
  });

  return () => tracer;
}

/**
 * Get real project name
 */
export function getRealProject(): string {
  return getRealApiCredentials().project;
}

/**
 * Get real source name
 */
export function getRealSource(): string {
  return getRealApiCredentials().source;
}

/**
 * Test-specific configuration matching Python test_config.py
 *
 * Retry configuration for backend verification:
 * - Max 10 attempts (~3 minute total retry window)
 * - Exponential backoff: base 1.5s, max 30s cap
 */
export interface TestConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelayCap: number;
}

export const testConfig: TestConfig = {
  maxAttempts: parseInt(process.env.HH_TEST_MAX_ATTEMPTS || '10', 10),
  baseDelay: parseFloat(process.env.HH_TEST_BASE_DELAY || '1.5'),
  maxDelayCap: parseFloat(process.env.HH_TEST_MAX_DELAY_CAP || '30.0'),
};

/**
 * Calculate total retry window for error messages
 */
export function calculateTotalWaitTime(config: TestConfig): number {
  let total = 0;
  for (let i = 0; i < config.maxAttempts - 1; i++) {
    total += Math.min(config.baseDelay * Math.pow(2, i), config.maxDelayCap);
  }
  return total;
}

import crypto from 'crypto';

/**
 * Generate unique test identifiers for parallel test execution.
 * Matches Python's generate_test_id pattern.
 */
export function generateTestId(
  testName: string,
  prefix: string = ''
): { operationName: string; uniqueId: string } {
  const timestamp = Date.now();
  const processId = process.pid;
  const threadId = 0; // Node.js is single-threaded, but include for consistency

  const uniqueData = `${testName}_${timestamp}_${processId}_${threadId}`;
  const testHash = crypto
    .createHash('md5')
    .update(uniqueData)
    .digest('hex')
    .substring(0, 8);

  const operationName = `${testName}_${testHash}`;
  const uniqueId = prefix ? `${prefix}_${testHash}` : `${testName}_test_${testHash}`;

  return { operationName, uniqueId };
}

/**
 * Generate unique span identifier
 */
export function generateSpanId(baseName: string, index?: number): string {
  const { operationName } = generateTestId(baseName);
  return index !== undefined ? `${operationName}_${index}` : operationName;
}

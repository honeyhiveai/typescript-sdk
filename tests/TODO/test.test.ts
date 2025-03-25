import { evaluate } from '../../src/sdk/evaluation';

describe('Dummy Test Suite', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  it('should handle basic arithmetic', () => {
    expect(1 + 1).toBe(2);
  });

  it('should work with strings', () => {
    expect('hello ' + 'world').toBe('hello world');
  });
});

describe('Evaluation Tests', () => {
  it('should initialize evaluation with a simple function', async () => {
    // Define a simple function to evaluate
    const testFunction = async (inputs: any) => {
      return { result: inputs.input + 1 };
    };

    // Define test dataset
    const testDataset = [
      { inputs: { input: 1 }, ground_truths: { expected: 2 } },
      { inputs: { input: 2 }, ground_truths: { expected: 3 } }
    ];

    // Create evaluation config
    const config = {
      name: 'Test Evaluation',
      function: testFunction,
      dataset: testDataset,
      evaluators: [
        async (output: any, _inputs: any, groundTruth: any) => {
          return {
            isCorrect: output.result === groundTruth.expected
          };
        }
      ]
    };

    // Run evaluation
    const result = await evaluate(config);

    // Verify evaluation result matches mock
    expect(result.runId).toBe('test-run-id');
    expect(result.datasetId).toBe('test-dataset-id');
    expect(result.sessionIds).toEqual(['test-session-1', 'test-session-2']);
    expect(result.status).toBe('completed');
  });
});

// tests/evaluate.test.ts
import { evaluate } from "honeyhive";

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_PROJECT_NAME = process.env.HH_PROJECT_NAME || "";
const SERVER_URL = "https://api.honeyhive.ai";
describe('evaluate function', () => {
    // Mock data
    const testDataset = [
        {
            "product_type": "electric vehicles",
            "region": "western europe",
            "time_period": "2023"
        }
    ];

    const FunctionToEvaluate = async (input: Record<string, any>) => {
        return {
            role: 'assistant',
            content: `Mock analysis for ${input.product_type} in ${input.region}`
        };
    };

    const sampleEvaluator = (input: Record<string, any>, output: any) => {
        return {
            sample_metric: 0.5,
            sample_metric_2: true
        };
    };

    it('should evaluate successfully with valid inputs', async () => {
        const result = await evaluate({
            evaluationFunction: FunctionToEvaluate,
            hh_api_key: HH_API_KEY,
            hh_project: HH_PROJECT_NAME,
            name: 'eval-test',
            dataset: testDataset,
            evaluators: [sampleEvaluator],
            suite: 'test-suite',
            server_url: SERVER_URL
        });

        expect(result).toBeDefined();
        expect(result.suite).toBe('test-suite');
        // Add more specific assertions based on what evaluate should return
    });

    it('should use default suite when not provided', async () => {
        const result = await evaluate({
            evaluationFunction: FunctionToEvaluate,
            hh_api_key: HH_API_KEY,
            hh_project: HH_PROJECT_NAME,
            name: 'eval-test',
            dataset: testDataset,
            evaluators: [sampleEvaluator],
        });

        expect(result).toBeDefined();
        expect(result.suite).toBe('default');
        // Add more specific assertions based on what evaluate should return
    });


    it('should throw error with invalid inputs', async () => {
        await expect(evaluate({
            evaluationFunction: FunctionToEvaluate,
            hh_api_key: "",  // invalid key
            hh_project: "",
            name: '',
            dataset: [],
            evaluators: []
        })).rejects.toThrow();
    });
});
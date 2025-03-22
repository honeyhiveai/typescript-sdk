import { evaluate } from "honeyhive";

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_PROJECT_NAME = process.env.HH_PROJECT_NAME || "";
const SERVER_URL = "https://api.honeyhive.ai";

describe('evaluate function', () => {
    // Mock data
    const testDataset = [{
        "inputs": {
            "product_type": "electric vehicles",
            "region": "western europe", 
            "time_period": "2023"
        },
        "ground_truths": {
            "output": "Mock analysis for electric vehicles in western europe"
        }
    },
    {
        "inputs": {
            "product_type": "smartphones",
            "region": "southeast asia",
            "time_period": "2023"
        },
        "ground_truths": {
            "output": "Mock analysis for smartphones in southeast asia"
        }
    },
    {
        "inputs": {
            "product_type": "cloud computing services",
            "region": "north america",
            "time_period": "2023" 
        },
        "ground_truths": {
            "output": "Mock analysis for cloud computing services in north america"
        }
    },
    {
        "inputs": {
            "product_type": "renewable energy",
            "region": "asia pacific",
            "time_period": "2023"
        },
        "ground_truths": {
            "output": "Mock analysis for renewable energy in asia pacific"
        }
    },
    {
        "inputs": {
            "product_type": "artificial intelligence",
            "region": "latin america",
            "time_period": "2023"
        },
        "ground_truths": {
            "output": "Mock analysis for artificial intelligence in latin america" 
        }
    }];

    const FunctionToEvaluate = async (inputs: Record<string, any>, ground_truths?: Record<string, any>) => {
        return {
            content: `Mock analysis for ${inputs.product_type} in ${inputs.region}. ${ground_truths?.output}`
        };
    };

    // Store the outputs for later assertion
    let capturedOutputs: any[] = [];

    const sampleEvaluator = (outputs: any, inputs: Record<string, any>, ground_truths?: Record<string, any>) => {
        
        const actualOutput = outputs.content;
        const expectedOutput = `Mock analysis for ${inputs.product_type} in ${inputs.region}. ${ground_truths?.output}`;
        
        capturedOutputs.push({
            actual: actualOutput,
            expected: expectedOutput,
            inputs,
            ground_truths
        });
        
        return {
            sample_metric: 0.5,
            sample_metric_2: true
        };
    };

    it('should evaluate successfully with valid inputs', async () => {
        capturedOutputs = [];
        
        const result = await evaluate({
            evaluationFunction: FunctionToEvaluate,
            hh_api_key: HH_API_KEY,
            hh_project: HH_PROJECT_NAME,
            name: 'test-suite-ts-1',
            dataset: testDataset,
            evaluators: [sampleEvaluator],
            suite: 'test-suite',
            server_url: SERVER_URL
        });
        expect(result).toBeDefined();
        expect(result.suite).toBe('test-suite');
        
        expect(capturedOutputs.length).toBeGreaterThan(0);
        
        // Check each captured output
        capturedOutputs.forEach(output => {
            expect(output.actual).toBe(output.expected);
        });
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
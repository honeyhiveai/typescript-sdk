import { evaluate } from '../../src/sdk/evaluation';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function pipeline(inputs: any, groundTruth: any): Promise<any> {
    const prompt = `Answer this question: ${inputs.query}`;
    const iterations = 1; // You can adjust this as needed
    
    for (let i = 0; i < iterations; i++) {
        console.log('i', i);
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
        });

        // Return both the model response and ground truth for comparison
        return {
            model_response: response.choices[0].message.content,
            ground_truth: groundTruth.response
        };
    }
}

const dataset = [
    {
        inputs: {
            query: "How does exercise affect diabetes?",
        },
        ground_truths: {
            response: "Regular exercise reduces diabetes risk by 30%. Daily walking is recommended.",
        }
    },
    {
        inputs: {
            query: "What is the capital of France?",
        },
        ground_truths: {
            response: "Paris",
        }
    },
    {
        inputs: {
            query: "What is the capital of France?",
        },
        ground_truths: {
            response: "Paris",
        }
    }
];

async function main() {
    const result = await evaluate({
        function: pipeline,
        dataset: dataset,
        apiKey: process.env.HH_API_KEY,
        project: process.env.HH_PROJECT,
        evaluators: [],
        serverUrl: process.env.HH_API_URL
    });

    console.log('Evaluation completed:', result);
}

// Only run if this file is being run directly
if (require.main === module) {
    main().catch(console.error);
} 
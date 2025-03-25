import { OpenAI } from 'openai';
import { evaluate } from 'honeyhive';

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
});

interface Input {
    query: string;
}

interface GroundTruth {
    response: string;
}

interface DatasetItem {
    inputs: Input;
    ground_truths: GroundTruth;
}

async function pipeline(inputs: Input, groundTruth: GroundTruth): Promise<{
    model_response: string;
    ground_truth: string;
}> {
    const prompt = `Answer this question: ${inputs.query}`;
    const iterations = 1; // You can adjust this as needed
    
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
    });

    // Return both the model response and ground truth for comparison
    return {
        model_response: response.choices[0].message.content ?? '',
        ground_truth: groundTruth.response
    };
}

const dataset: DatasetItem[] = [
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

async function main(): Promise<void> {
    const result = await evaluate({
        function: pipeline,
        dataset: dataset,
        apiKey: process.env['HH_API_KEY'],
        project: process.env['HH_PROJECT'],
        evaluators: [],
        serverUrl: process.env['HH_API_URL']
    });
    console.log('Evaluation completed:', result);
}

export { main };

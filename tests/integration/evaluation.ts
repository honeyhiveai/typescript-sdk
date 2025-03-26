import { OpenAI } from 'openai';
import { evaluate, HoneyHiveTracer } from 'honeyhive';

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

async function callOpenAI(prompt: string) {
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
}

async function tool(foo: any) {
    return foo;
}

async function pipeline(inputs: Input, groundTruth: GroundTruth): Promise<{
    model_response: string;
    ground_truth: string;
}> {
    const tracer = await HoneyHiveTracer.init({verbose: true});

    // Test tool tracing
    const tracedTool = tracer.traceTool(tool);
    await tracedTool(42);

    // Test model tracing
    const prompt = `Answer this question: ${inputs.query}`;
    const response = await callOpenAI(prompt);

    // Return both the model response and ground truth for comparison
    await tracer.flush();
    return {
        model_response: response ?? '',
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
            query: "Write a poem about love",
        },
        ground_truths: {
            response: "Love is a beautiful thing",
        }
    },
    {
        inputs: {
            query: "Write a poem about war",
        },
        ground_truths: {
            response: "War is a terrible thing",
        }
    },
    {
        inputs: {
            query: "Write an essay on ww2",
        },
        ground_truths: {
            response: "World War II was a global conflict that lasted from 1939 to 1945, involving most of the world's nations, including all of the great powers, eventually forming two opposing military alliances: the Allies and the Axis.",
        }
    },
    {
        inputs: {
            query: "Write an essay on ww3",
        },
        ground_truths: {
            response: "World War III will be a global conflict that will last from 2024 to 2030, involving most of the world's nations, including all of the great powers, eventually forming two opposing military alliances: the Allies and the Axis.",
        }
    }
];

function simpleEvaluator(outputs: any, inputs: any, groundTruth: any) {
    return {
        accuracy: outputs.model_response === groundTruth.response ? 1 : 0
    }
}

function simpleEvaluator2(..._: any[]) {
    return 42;
}

async function simpleEvaluator3(..._: any[]) {
    return true;
}

async function simpleEvaluator4(..._: any[]) {
    return 'type';
}


async function main(): Promise<void> {
    const result = await evaluate({
        function: pipeline,
        dataset: dataset,
        evaluators: [simpleEvaluator, simpleEvaluator2, simpleEvaluator3, simpleEvaluator4],
        verbose: true,
        instrumentModules: {
            openAI: OpenAI
        }
    });
    // const result = await pipeline(dataset[0].inputs, dataset[0].ground_truths);
    console.log('Evaluation completed:', result);
}

export { main };

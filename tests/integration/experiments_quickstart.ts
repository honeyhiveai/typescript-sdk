import { evaluate } from "honeyhive";
import { OpenAI } from 'openai';
import { HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator } from "honeyhive/models/components/index.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// Create function to be evaluated
// input -> parameter to which datapoint or json value will be passed
export async function functionToEvaluate(input: Record<string, any>, ground_truths: Record<string, any>) {
    
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: 'system',
                    content: `You are an expert analyst specializing in ${input.product_type} market trends.`
                },
                {
                    role: 'user',
                    content: `Could you provide an analysis of the current market performance and consumer reception of ${input.product_type} in ${input.region}? Please include any notable trends or challenges specific to this region.`
                }
            ],
        });

        // Output -> session output
        return response.choices[0].message;
    } catch (error) {
        console.error('Error making GPT-4 call:', error);
        throw error;
    }
}

const dataset = [
    {
        "inputs": {
            "product_type": "electric vehicles",
            "region": "western europe"   
        },
        "ground_truths": {
            "response": "As of 2023, the electric vehicle (EV) ... ",
        }
    },
    {
        "inputs": {
            "product_type": "gaming consoles",
            "region": "north america"
        },
        "ground_truths": {
            "response": "As of 2023, the gaming console market ... ",
        }
    },
    {
        "inputs": {
            "product_type": "smart home devices",
            "region": "australia and new zealand" 
        },
        "ground_truths": {
            "response": "As of 2023, the market for smart home devices in Australia and New Zealand ... ",
        }
    }
]

// Sample evaluator that returns fixed metrics
function sampleEvaluator(output: any, input: Record<string, any>, ground_truths: Record<string, any>) {
    // Code here
    return {
        sample_metric: 0.5,
        sample_metric_2: true
    };
}

async function main() {

    if (!process.env.HH_API_KEY) {
        throw new Error("HH_API_KEY environment variable is not set.");
    }
    if (!process.env.HH_PROJECT) {
        throw new Error("HH_PROJECT environment variable is not set.");
    }
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY environment variable is not set.");
    }
     
    const result = await  evaluate({
            function: functionToEvaluate,       // Function to be evaluated
            apiKey: process.env.HH_API_KEY,
            project: process.env.HH_PROJECT,
            name: 'Sample Experiment',
            dataset: dataset,                        // to be passed for json_list
            evaluators: [sampleEvaluator],                // to compute client-side metrics on each run
            serverUrl: process.env.HH_API_URL
        });

        assert(result, "Evaluate result should not be undefined");
        const sessionIds = result.sessionIds;
        assert(sessionIds && sessionIds.length > 0, "sessionIds should be populated");
        // Wait 5 seconds for data propagation
        await new Promise(resolve => setTimeout(resolve, 10000));
        const sdk = new HoneyHive({
            bearerAuth: process.env.HH_API_KEY,
        });
    
    
        for (const sessionId of sessionIds) {
            console.log(`Fetching events for session ID: ${sessionId}`);
            try {
                const res = await sdk.events.getEvents({
                    project: process.env.HH_PROJECT,
                    filters: [
                        {
                            field: "event_type",
                            value: "session",
                            operator: Operator.Is
                        },
                        {
                            field: "session_id",
                            value: sessionId,
                            operator: Operator.Is
                        }
                    ],
                });
    
                // Assert that events exist and the first event has the expected metrics
                assert(res.events && res.events.length > 0, `No events found for session ${sessionId}`);
                const firstEvent = res.events[0];
                assert(firstEvent.metrics, `Metrics not found for the first event in session ${sessionId}`);
                assert(firstEvent.metrics.sampleEvaluator, `sampleEvaluator metric not found in the first event for session ${sessionId}`);
                assert.deepStrictEqual(firstEvent.metrics.sampleEvaluator, 
                    { sample_metric: 0.5, sample_metric_2: true },
                    `Metrics for sampleEvaluator in session ${sessionId} do not match the expected values.`
                );
    
                console.log(`Events for session ${sessionId}:`, res.events);
    
            } catch (error) {
                console.error(`Error fetching events for session ${sessionId}:`, error);
            }
        }
    
        console.log('Finished fetching events for all sessions.');
    
}

export { main };

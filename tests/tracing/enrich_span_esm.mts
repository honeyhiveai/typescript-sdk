import { v4 as uuidv4 } from "uuid";
import { HoneyHiveTracer } from "honeyhive";
import { OpenAI } from "openai";

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL || "https://api.honeyhive.ai";
const HH_PROJECT_NAME = process.env.HH_PROJECT_NAME || "";


async function initializeTracer(sessionName: string): Promise<HoneyHiveTracer> {
    const tracer = await HoneyHiveTracer.init({
        apiKey: HH_API_KEY,
        project: HH_PROJECT_NAME,
        serverUrl: HH_API_URL,
        sessionName: sessionName,
    });

    return tracer;
}

(async () => {
    console.log("CJS Script started");
    const sessionName = `HoneyHive TS tracer Test ${uuidv4()}`;
    console.log(`Generated session name: ${sessionName}`);

    console.log(`HH_API_KEY: ${HH_API_KEY}`);
    console.log(`HH_API_URL: ${HH_API_URL}`);
    console.log(`HH_PROJECT_NAME: ${HH_PROJECT_NAME}`);

    /*
    Expected Trace:
    - enrich session
    - chain
    -- tool
    */

    const tracer = await initializeTracer(sessionName);

    await tracer.enrichSession({
        metadata: {
            session_metadata: "meta",
        },
        metrics: {
            metric_1: "sm metric",
        },
        inputs: {
            input_1: "input 1",
        },
        outputs: {
            output_1: "output 1",
        },
        userProperties: {
            user_property_1: "im a neural net",
        },
        feedback: {
            human_mood: "ecstatic",
        },
    });

    const openai = new OpenAI();

    const func3 = tracer.traceFunction({
        eventType: "model"
    })(
        async function getRelevantDocuments(queryVector: string) {
            tracer.enrichSpan({
                inputs: {
                    queryVector: 'embedding',
                },
            });
            return ["a", "b"];
        }
    );

    const func2 = tracer.traceFunction({config: {some_config: "some_value"}})(async (param1: string) => {
        tracer.enrichSpan({
            feedback: {
                human_mood: "grumpy",
            },
            metadata: {
                meta_2: "meta 2",
            },
            outputs: {
                output_1: "output 1",
            },
        });
        await func3('test');
        return `Result with ${param1}`;
    })

    const myFunction = tracer.traceFunction()(async function (param1: string, param2: number) {

        tracer.enrichSpan({
            inputs: {
                param1: 'abc',
                param2: 'def',
            },
            metadata: {
                meta_1: "meta 1",
            },
        });

        tracer.enrichSpan({
            metadata: {
                meta_1: "meta 2",
            },
        });

        await func2('test');

        tracer.enrichSpan({
            metrics: {
                metric_1: "metric 1",
            },
            error: "agi is not aligned"
        });

        // Your function code here
        return `Result with ${param1} and ${param2}`;
    });

    // Call the traced function
    await myFunction('test', 42);
    
    const toolFunction = tracer.traceTool(async function tool(param1: string) {
        return `Result with ${param1}`;
    });


    const chainFunction = tracer.traceChain(async function chain(param1: string) {
        // non-streaming response
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "wassup dawg say 'no stream'" }],
        });
        console.log(response.choices[0].message.content);

        // streaming response
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "wassup dawg say 'we streamin'" }],
            stream: true,
        });
        let streamContent = '';
        for await (const chunk of stream) {
            streamContent += chunk.choices[0]?.delta.content || '';
            console.log(chunk.choices[0]?.delta.content || '');
        }
        
        await toolFunction('test');

        tracer.enrichSpan({
            outputs: {
                output_1: "output 1",
            },
            metadata: {
                meta_3: "meta quest 3",
            },
        });
        return `Result with ${param1}`;
    });
    
    await chainFunction('test');

})();

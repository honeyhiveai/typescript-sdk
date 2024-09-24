const { v4: uuidv4 } = require("uuid");
import { HoneyHiveTracer } from "honeyhive";

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL || "https://api.honeyhive.ai";
const HH_PROJECT = process.env.HH_PROJECT || "";

async function initializeTracer(sessionName: string): Promise<HoneyHiveTracer> {
    const tracer = await HoneyHiveTracer.init({
        apiKey: HH_API_KEY,
        project: HH_PROJECT,
        serverUrl: HH_API_URL,
    });

    return tracer;
}

(async () => {
    console.log("Script started");
    const sessionName = `HoneyHive TS Tracer Test ${uuidv4()}`;
    console.log(`Generated session name: ${sessionName}`);
    console.log(`HH_API_KEY: ${HH_API_KEY}`);
    console.log(`HH_API_URL: ${HH_API_URL}`);
    console.log(`HH_PROJECT: ${HH_PROJECT}`);

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

    const myFunction = tracer.traceFunction()(async function (param1, param2) {

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
})();

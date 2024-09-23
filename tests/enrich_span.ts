const { v4: uuidv4 } = require("uuid");
import { HoneyHiveTracer } from "honeyhive";

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL || "https://api.honeyhive.ai";
const HH_PROJECT = process.env.HH_PROJECT || "agi";

async function initializeTracer(sessionName: string): Promise<HoneyHiveTracer> {
    const tracer = await HoneyHiveTracer.init({
        apiKey: HH_API_KEY,
        project: HH_PROJECT,
        sessionName: sessionName,
        source: "HoneyHive TS Tracer Test",
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

    const func2 = tracer.traceFunction()((param1: string) => {
        tracer.enrichSpan({
            feedback: {
                human_mood: "grumpy",
            },
            metadata: {
                meta_2: "meta 2",
            }
        });
        return `Result with ${param1}`;
    })

    const myFunction = tracer.traceFunction()(function (param1, param2) {

        tracer.enrichSpan({
            metadata: {
                meta_1: "meta 1",
            },
        });

        func2('test');

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
    myFunction('test', 42);
})();

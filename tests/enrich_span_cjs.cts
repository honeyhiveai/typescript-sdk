const uuidv4 = require("uuid").v4;
const HoneyHiveTracer = require("honeyhive").HoneyHiveTracer;
const OpenAI = require("openai").OpenAI;

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL || "https://api.honeyhive.ai";
const HH_PROJECT_NAME = process.env.HH_PROJECT_NAME || "";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function initializeTracer(sessionName: string): Promise<typeof HoneyHiveTracer> {
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

    const tracer: typeof HoneyHiveTracer = await initializeTracer(sessionName);

    await tracer.enrichSession({
        metadata: {
            session_metadata: "enrich session: metadata",
        },
        metrics: {
            metric_1: "enrich session: metric",
        },
        inputs: {
            input_1: "enrich session: input",
        },
        outputs: {
            output_1: "enrich session: output",
        },
        userProperties: {
            user_property_1: "enrich session: user property",
        },
        feedback: {
            human_mood: "enrich session: feedback",
        },
    });

    const toolFunc = tracer.traceTool(
        async function getRelevantDocuments(queryVector: string) {
            tracer.enrichSpan({
                inputs: {
                    queryVector: 'enrich span tool: inputs.queryVector',
                },
            });
            return ["a", "b"];
        }
    );

    const openai = new OpenAI();

    const chainFunc = tracer.traceChain(async function chain(param1: string) {

        // non-streaming response
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "say 'non-streaming response'" }],
        });
        console.log(response.choices[0].message.content);

        tracer.logModel("openai call", { outputs: {model_output: response.choices[0].message.content}});


        await toolFunc('tool input');

        // streaming response
        const stream = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "say 'streaming response'" }],
            stream: true,
        });
        let streamContent = '';
        for await (const chunk of stream) {
            streamContent += chunk.choices[0]?.delta.content || '';
            console.log(chunk.choices[0]?.delta.content || '');
        }

        return `LLM result`;
    }, {
        metadata: {
            chain_metadata: "enrich chain: metadata",
        },
        metrics: {
            chain_metric: "enrich chain: metric",
        },
    });

    await chainFunc('test');
    
    console.log("Done. Waiting for 5 seconds...");
    await sleep(5000);
})();

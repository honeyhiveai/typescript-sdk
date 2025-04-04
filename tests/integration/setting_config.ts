import { HoneyHiveTracer, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js";

// Define types for the prompt template structure
interface PromptMessage {
    role: string;
    content: string;
}

interface PromptTemplate {
    template: PromptMessage[];
    prompt: PromptMessage[];
}

async function main() {
    // Environment variable checks
    if (!process.env.HH_API_KEY) {
        throw new Error("HH_API_KEY environment variable is not set.");
    }
    if (!process.env.HH_PROJECT) {
        throw new Error("HH_PROJECT environment variable is not set.");
    }
    const serverURL = process.env.HH_API_URL; // Optional

    const tracer = await HoneyHiveTracer.init({
      apiKey: process.env.HH_API_KEY,
      project: process.env.HH_PROJECT,
      sessionName: "setting-config-test", // Distinct session name
      serverUrl: serverURL 
    });

    const currentSessionId = tracer.sessionId;
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    // Define the prompt template object
    const prompt_template: PromptTemplate = {
        template: [
            {role: "system", content: "You are a helpful AI assistant."}, 
            {role: "user", content: "Write a short poem about programming."} 
        ],
        prompt: [
            {role: "system", content: "You are a helpful AI assistant."}, 
            {role: "user", content: "Write a short poem about programming."} 
        ]
    };

    const myTracedFunction = tracer.traceFunction("my_function")(
        function (
            input: string, 
            pt: PromptTemplate // Use the defined type
        ) {
            console.log("Executing myTracedFunction");
            // span enrichment
            tracer.enrichSpan({
              config: {
                template: pt.template,
                prompt: pt.prompt,
                hyperparams: {
                    temperature: 0.5,
                    max_tokens: 100,
                    top_p: 0.9,
                    top_k: 50,
                }
              }
            });
        
            // Your function code here (mock response)
            const response = "This is a mock response.";
            console.log("myTracedFunction finished");
            return response;
        }
    );

    // Execute the traced function
    console.log("Calling myTracedFunction...");
    const result = myTracedFunction("This is a mock input", prompt_template);
    console.log("myTracedFunction call returned:", result);

    // Wait for data propagation
    console.log("Waiting for data propagation...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Initialize SDK
    const sdk = new HoneyHive({
        bearerAuth: process.env.HH_API_KEY,
        serverURL: serverURL
    });

    // Fetch events for the session
    console.log(`Fetching events for session ID: ${currentSessionId}`);
    try {
        const res = await sdk.events.getEvents({
            project: process.env.HH_PROJECT,
            filters: [
                {
                    field: "session_id",
                    value: currentSessionId,
                    operator: Operator.Is
                }
            ],
        });

        // Assertions
        assert(res.events, `Events response is undefined for session ${currentSessionId}`);
        // Expecting at least 2 events: Session Start, my_function trace
        assert(res.events.length >= 2, `Expected at least 2 events for session ${currentSessionId}, found ${res.events.length}`);
        console.log(`Found ${res.events.length} events.`);

        // Find the event for the 'my_function' trace
        // Note: The event name defaults to the function name if not specified in traceFunction
        // Since we passed "my_function" to traceFunction, we look for that.
        const myFunctionEvent = res.events.find((e: Event) => e.eventName === 'my_function');
        assert(myFunctionEvent, "'my_function' event not found");
        console.log(`Found 'my_function' event: ${myFunctionEvent.eventId}`);
        assert(myFunctionEvent.config, "Config not found in 'my_function' event");
        console.log("'my_function' event config:", myFunctionEvent.config);

        // Verify the config contents using deepStrictEqual for objects/arrays
        assert.deepStrictEqual(myFunctionEvent.config.template, prompt_template.template, "Config template does not match");
        assert.deepStrictEqual(myFunctionEvent.config.prompt, prompt_template.prompt, "Config prompt does not match");
        assert.deepStrictEqual(myFunctionEvent.config.hyperparams, {
            temperature: 0.5,
            max_tokens: 100,
            top_p: 0.9,
            top_k: 50,
        }, "Config hyperparams do not match");
        console.log("Config content verified successfully.");

    } catch (error) {
        console.error(`Error fetching or verifying events for session ${currentSessionId}:`, error);
        throw error; // Re-throw the error to fail the test
    }

    console.log('Test finished successfully.');
}

export { main };
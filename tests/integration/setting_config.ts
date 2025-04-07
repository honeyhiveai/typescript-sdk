import { HoneyHiveTracer, traceTool, enrichSpan, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js";

// Define types for the prompt template structure (from docs snippet)
interface PromptMessage {
    role: string;
    content: string;
}

interface PromptTemplate {
    template: PromptMessage[];
    prompt: PromptMessage[];
}

// Initialize tracer function (adapted from new_setting_config.ts)
async function initializeTracer() {
    // Environment variable checks
    if (!process.env.HH_API_KEY) {
        throw new Error("HH_API_KEY environment variable is not set.");
    }
    if (!process.env.HH_PROJECT) {
        throw new Error("HH_PROJECT environment variable is not set.");
    }
    const serverURL = process.env.HH_API_URL; // Optional

    return await HoneyHiveTracer.init({
        apiKey: process.env.HH_API_KEY,
        project: process.env.HH_PROJECT,
        sessionName: "docs-setting-config-test", // Distinct session name
        serverUrl: serverURL,
        verbose: true,
    });
}

// Main function to initialize tracer, run the traced logic, and verify
async function main() {
    const tracer = await initializeTracer();
    const currentSessionId = tracer.sessionId; // Capture session ID
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    // Define the function to be traced (from docs snippet)
    const myTracedFunction = traceTool(
        function my_function( // Function name is used as span name
            input: string,
            prompt_template: PromptTemplate
        ) {
            console.log("Executing my_function (from docs snippet)");
            // Add configuration specific to this span
            enrichSpan({
              config: {
                template: prompt_template.template,
                prompt: prompt_template.prompt,
                hyperparams: {
                    temperature: 0.5,
                    max_tokens: 100,
                    top_p: 0.9,
                    top_k: 50,
                }
              }
            });

            // Your function code here
            const response = `Processed input: ${input}`;
            console.log("my_function finished");
            return response;
        }
    );

    // Define the prompt data (from docs snippet execution block)
    const prompt_template_data: PromptTemplate = {
        template: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: "Write a short poem about programming." }
        ],
        prompt: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: "Write a short poem about programming." }
        ]
    };

    try {
        // --- Main Execution Logic (from docs snippet) ---
        // Wrap the execution in tracer.trace() to establish context
        console.log("Calling myTracedFunction within tracer.trace()...");
        await tracer.trace(async () => {
            // Execute the traced function within the trace context
            const result = myTracedFunction("Some input data", prompt_template_data);
            console.log("myTracedFunction call returned:", result);
        });
        console.log("Traced execution finished.");

        // Ensure data is sent before verification (copied from new_setting_config.ts)
        console.log("Waiting for data propagation after flush...");
        await tracer.flush();
        console.log("Tracer flushed.");
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait

        // --- Verification Logic (Adapted from new_setting_config.ts) ---
        console.log(`Starting verification for session ID: ${currentSessionId}`);
        const sdk = new HoneyHive({
            bearerAuth: process.env.HH_API_KEY!,
            serverURL: process.env.HH_API_URL
        });

        console.log(`Fetching events for session ID: ${currentSessionId}`);
        const res = await sdk.events.getEvents({
            project: process.env.HH_PROJECT!,
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
        // Expecting at least 3 events: Session Start, outer tracer.trace span, my_function span
        assert(res.events.length >= 3, `Expected at least 3 events for session ${currentSessionId}, found ${res.events.length}`);
        console.log(`Found ${res.events.length} events.`);

        // Find the specific event for the traced function
        const myFunctionEvent = res.events.find((e: Event) => e.eventName === 'my_function'); // Use function name
        assert(myFunctionEvent, "'my_function' event not found");
        console.log(`Found 'my_function' event: ${myFunctionEvent.eventId}`);
        assert(myFunctionEvent.config, "Config not found in 'my_function' event");
        console.log("'my_function' event config:", myFunctionEvent.config);

        // Verify the config content against the data used
        assert.deepStrictEqual(myFunctionEvent.config.template, prompt_template_data.template, "Config template does not match");
        assert.deepStrictEqual(myFunctionEvent.config.prompt, prompt_template_data.prompt, "Config prompt does not match");
        assert.deepStrictEqual(myFunctionEvent.config.hyperparams, {
            temperature: 0.5,
            max_tokens: 100,
            top_p: 0.9,
            top_k: 50,
        }, "Config hyperparams do not match");
        console.log("Config content verified successfully.");
        // --- End Verification Logic ---

        console.log('Test finished successfully.');
        return true; // Return true only if both execution and verification succeed

    } catch (error) {
        console.error(`Error during traced execution or verification for session ${currentSessionId}:`, error);
        return false; // Indicate failure
    }
}

export { main }; 
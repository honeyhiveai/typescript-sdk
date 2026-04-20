import { HoneyHiveTracer, traceTool, enrichSpan, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js";

// Initialize tracer function (adapted from new_setting_metadata.ts)
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
        sessionName: "docs-setting-metadata-test", // Distinct session name
        serverUrl: serverURL,
        verbose: true,
    });
}

// Main function to initialize tracer, run the traced logic, and verify
async function main() {
    const tracer = await initializeTracer();
    const currentSessionId = tracer.sessionId; // Capture session ID
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    // Define the traced function using traceTool (from docs snippet)
    const myTracedFunction = traceTool(
        function my_function ( // Function name is used as span name
            input: string,
            something: any
        ) {
            console.log("Executing my_function (from docs snippet)");
            // Add metadata specific to this span
            enrichSpan({
                metadata: {
                    "experiment-id": 12345,
                    "something": something,
                    // any other custom fields and values as you need
                }
            });

            // Your function code here (mock response)
            const response = `Processed input: ${input}`;
            console.log("my_function finished");
            return response;
        }
    );

    // Define the metadata value to be used (from docs snippet execution block)
    const metadataValue = "some-metadata";

    try {
        // --- Main Execution Logic (from docs snippet) ---
        // Wrap the execution in tracer.trace() to establish context
        console.log("Calling myTracedFunction within tracer.trace()...");
        await tracer.trace(async () => {
            // Execute the traced function within the trace context
            const result = myTracedFunction("This is a mock input", metadataValue);
            console.log("myTracedFunction call returned:", result);
        });
        console.log("Traced execution finished.");


        // Ensure data is sent before verification (copied from new_setting_metadata.ts)
        console.log("Waiting for data propagation after flush...");
        await tracer.flush();
        console.log("Tracer flushed.");
        await new Promise(resolve => setTimeout(resolve, 15000)); // Wait

        // --- Verification Logic (Adapted from new_setting_metadata.ts) ---
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

        const myFunctionEvent = res.events.find((e: Event) => e.eventName === 'my_function'); // Use function name
        assert(myFunctionEvent, "'my_function' event not found");
        console.log(`Found 'my_function' event: ${myFunctionEvent.eventId}`);
        assert(myFunctionEvent.metadata, "Metadata not found in 'my_function' event");
        console.log("'my_function' event metadata:", myFunctionEvent.metadata);

        // Verify the metadata contents
        assert.strictEqual(myFunctionEvent.metadata["experiment-id"], 12345, "Metadata 'experiment-id' does not match");
        // Use the value defined before the try block for verification
        assert.strictEqual(myFunctionEvent.metadata["something"], metadataValue, "Metadata 'something' does not match");
        console.log("Metadata content verified successfully.");
        // --- End Verification Logic ---

        console.log('Test finished successfully.');
        return true; // Return true only if both execution and verification succeed

    } catch (error) {
        console.error(`Error during traced execution or verification for session ${currentSessionId}:`, error);
        return false; // Indicate failure
    }
}

export { main }; 
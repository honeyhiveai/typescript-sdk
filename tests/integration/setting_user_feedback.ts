import { HoneyHiveTracer, traceTool, enrichSpan, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js";

// Initialize tracer function (adapted from previous examples)
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
        sessionName: "docs-setting-user-feedback-test", // Distinct session name
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
    const myTracedFunction = traceTool(function my_llm_call( // Function name is used as span name
        param1: string,
        param2: string,
        user_id: string | number
    ) {
        console.log("Executing my_llm_call (from docs snippet)");
        // Add feedback specific to this span
        enrichSpan({
          feedback: {
            "liked": true,
            "comment": "The model hallucinated the capital of New York",
            "user_id": user_id,
            // optionally adding reference ground truth
            "ground_truth": "The capital of New York is Albany",
            // any other custom fields and values as you need
          }
        });

        // Your function code here
        const response = `Result with ${param1} and ${param2}`;
        console.log("my_llm_call finished");
        return response;
    });

    // Define the user ID to be used (from docs snippet execution block)
    const userId = "user-abc-123";

    try {
        // --- Main Execution Logic (from docs snippet) ---
        // Wrap the execution in tracer.trace() to establish context
        console.log("Calling myTracedFunction within tracer.trace()...");
        await tracer.trace(async () => {
            // Execute the traced function within the trace context
            const result = myTracedFunction("input1", "input2", userId);
            console.log("myTracedFunction call returned:", result);
        });
        console.log("Traced execution finished.");

        // Ensure data is sent before verification (copied from previous examples)
        console.log("Waiting for data propagation after flush...");
        await tracer.flush();
        console.log("Tracer flushed.");
        await new Promise(resolve => setTimeout(resolve, 15000)); // Wait

        // --- Verification Logic (Adapted from previous examples) ---
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
        // Expecting at least 3 events: Session Start, outer tracer.trace span, my_llm_call span
        assert(res.events.length >= 3, `Expected at least 3 events for session ${currentSessionId}, found ${res.events.length}`);
        console.log(`Found ${res.events.length} events.`);

        const myLlmCallEvent = res.events.find((e: Event) => e.eventName === 'my_llm_call'); // Use function name
        assert(myLlmCallEvent, "'my_llm_call' event not found");
        console.log(`Found 'my_llm_call' event: ${myLlmCallEvent.eventId}`);
        assert(myLlmCallEvent.feedback, "Feedback not found in 'my_llm_call' event");
        console.log("'my_llm_call' event feedback:", myLlmCallEvent.feedback);

        // Verify the feedback contents
        assert.strictEqual(myLlmCallEvent.feedback["liked"], true, "Feedback 'liked' does not match");
        assert.strictEqual(myLlmCallEvent.feedback["comment"], "The model hallucinated the capital of New York", "Feedback 'comment' does not match");
        assert.strictEqual(myLlmCallEvent.feedback["user_id"], userId, "Feedback 'user_id' does not match");
        assert.strictEqual(myLlmCallEvent.feedback["ground_truth"], "The capital of New York is Albany", "Feedback 'ground_truth' does not match");
        console.log("Feedback content verified successfully.");
        // --- End Verification Logic ---

        console.log('Test finished successfully.');
        return true; // Return true only if both execution and verification succeed

    } catch (error) {
        console.error(`Error during traced execution or verification for session ${currentSessionId}:`, error);
        return false; // Indicate failure
    }
}

export { main }; 
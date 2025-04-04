import { HoneyHiveTracer, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator } from "honeyhive/models/components/index.js";


async function main() {
    // Environment variable checks
    if (!process.env.HH_API_KEY) {
        throw new Error("HH_API_KEY environment variable is not set.");
    }
    if (!process.env.HH_PROJECT) {
        throw new Error("HH_PROJECT environment variable is not set.");
    }
    // Optional variables - provide defaults or handle absence if needed
    const source = process.env.HH_SOURCE; // Optional
    const sessionName = process.env.HH_SESSION; // Optional
    const serverURL = process.env.HH_API_URL; // Optional

    // Initialize tracer
    const tracer = await HoneyHiveTracer.init({
      apiKey: process.env.HH_API_KEY,
      project: process.env.HH_PROJECT,
      source: source, 
      sessionName: sessionName, 
      serverUrl: serverURL // Correct property name is serverUrl
    });

    const currentSessionId = tracer.sessionId;
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    // Wait for data propagation
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Initialize SDK
    const sdk = new HoneyHive({
        bearerAuth: process.env.HH_API_KEY,
        serverURL: serverURL // Correct property name is serverURL here
    });

    // Fetch events for the session
    console.log(`Fetching events for session ID: ${currentSessionId}`);
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
                    field: "session_id", // Filter uses session_id
                    value: currentSessionId,
                    operator: Operator.Is
                }
            ],
        });

        // Assertions
        assert(res.events, `Events response is undefined for session ${currentSessionId}`);
        assert(res.events.length > 0, `No events found for session ${currentSessionId}`);
        const firstEvent = res.events[0];
        assert.strictEqual(firstEvent.sessionId, currentSessionId, `Event session ID ${firstEvent.sessionId} does not match expected ${currentSessionId}`); // Event object uses sessionId
        console.log(`Successfully verified session start event for session ID: ${currentSessionId}`);

    } catch (error) {
        console.error(`Error fetching or verifying events for session ${currentSessionId}:`, error);
        throw error; // Re-throw the error to fail the test
    }

    console.log('Test finished successfully.');
}

export { main };

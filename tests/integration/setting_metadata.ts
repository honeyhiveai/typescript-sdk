import { HoneyHiveTracer, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js";

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
      sessionName: "setting-metadata-test", // Distinct session name
      serverUrl: serverURL 
    });

    const currentSessionId = tracer.sessionId;
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    const myTracedFunction = tracer.traceFunction("my_function")(
        function (
          input: string,
          something: any
        ) {
            console.log("Executing myTracedFunction");
            // span enrichment
            tracer.enrichSpan({
              metadata: {
                "experiment-id": 12345,
                "something": something,
                // any other custom fields and values as you need
              }
            });
        
            // Your function code here (mock response)
            const response = "This is a mock response.";
            console.log("myTracedFunction finished");
            return response;
        }
    );

    // Execute the traced function
    const metadataValue = "some-metadata";
    console.log("Calling myTracedFunction...");
    const result = myTracedFunction("This is a mock input", metadataValue);
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
        const myFunctionEvent = res.events.find((e: Event) => e.eventName === 'my_function');
        assert(myFunctionEvent, "'my_function' event not found");
        console.log(`Found 'my_function' event: ${myFunctionEvent.eventId}`);
        assert(myFunctionEvent.metadata, "Metadata not found in 'my_function' event");
        console.log("'my_function' event metadata:", myFunctionEvent.metadata);

        // Verify the metadata contents
        // Use strictEqual for direct value comparison
        assert.strictEqual(myFunctionEvent.metadata["experiment-id"], 12345, "Metadata 'experiment-id' does not match");
        assert.strictEqual(myFunctionEvent.metadata["something"], metadataValue, "Metadata 'something' does not match");
        console.log("Metadata content verified successfully.");

    } catch (error) {
        console.error(`Error fetching or verifying events for session ${currentSessionId}:`, error);
        throw error; // Re-throw the error to fail the test
    }

    console.log('Test finished successfully.');
}

export { main };
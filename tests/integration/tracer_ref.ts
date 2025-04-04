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

    // Initialize tracer
    const tracer = await HoneyHiveTracer.init({
      apiKey: process.env.HH_API_KEY,
      project: process.env.HH_PROJECT,
      sessionName: "Tracer Ref Test Session", // Using name from Python example
      source: "source_identifier",        // Using source from Python example
      serverUrl: serverURL 
    });

    const currentSessionId = tracer.sessionId;
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    // Define final enrichment objects
    const finalFeedback = { 'some_domain_expert': "Final feedback" };
    const finalMetrics = { "final_metric": 1.0 };
    const finalMetadata = { "final_key": "final_value" };

    // Enrich the session simultaneously
    console.log("Enriching session with final feedback, metrics, and metadata...");
    tracer.enrichSession({
        feedback: finalFeedback,
        metrics: finalMetrics,
        metadata: finalMetadata
    });
    console.log("Session enriched.");

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
        // Expecting at least 1 event: Session Start
        assert(res.events.length >= 1, `Expected at least 1 event for session ${currentSessionId}, found ${res.events.length}`);
        console.log(`Found ${res.events.length} events.`);

        // Find the session start event
        const sessionEvent = res.events.find((e: Event) => e.eventType === 'session');
        assert(sessionEvent, "Session start event not found");
        console.log(`Found session event: ${sessionEvent.eventId}`);

        // Verify the final feedback, metrics, and metadata
        assert(sessionEvent.feedback, "Feedback not found in session event");
        assert(sessionEvent.metrics, "Metrics not found in session event");
        assert(sessionEvent.metadata, "Metadata not found in session event");

        console.log("Session event feedback:", sessionEvent.feedback);
        console.log("Session event metrics:", sessionEvent.metrics);
        console.log("Session event metadata:", sessionEvent.metadata);

        assert.deepStrictEqual(sessionEvent.feedback, finalFeedback, "Feedback does not match");
        assert(sessionEvent.metrics.final_metric === finalMetrics.final_metric, `Metric 'final_metric' does not match`);
        assert(sessionEvent.metadata.final_key === finalMetadata.final_key, `Metadata 'final_key' does not match`);

        console.log("Feedback, metrics, and metadata verified successfully.");

    } catch (error) {
        console.error(`Error fetching or verifying events for session ${currentSessionId}:`, error);
        throw error; // Re-throw the error to fail the test
    }

    console.log('Test finished successfully.');
}

export { main };
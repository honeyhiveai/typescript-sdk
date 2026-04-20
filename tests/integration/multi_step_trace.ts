import { HoneyHiveTracer, traceTool, traceModel, traceChain, enrichSpan, enrichSession, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js"; // Import Event type

// Keep interfaces used in the functions (copied from new_multi_step_trace.ts)
interface MedicalDocument {
    docs: string[];
    response: string;
}

interface RagPipelineMetrics {
    num_retrieved_docs: number;
    query_length: number;
}

// Initialize tracer function (adapted from new_multi_step_trace.ts)
async function initializeTracer() {
    // Environment variable checks (can be kept or rely on SDK defaults/env vars)
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
        sessionName: "docs-multi-step-trace-test", // Use a distinct session name for this test
        serverUrl: serverURL,
        verbose: true, // Enable verbose logging for debugging if needed
    });
}

// Main function to initialize tracer, run the traced logic, and verify
async function main() {
    const tracer = await initializeTracer();
    const currentSessionId = tracer.sessionId; // Capture session ID
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);
    let executionSuccess = false;

    // Define the functions based on the provided docs snippet
    // Define the get_relevant_docs function with traceTool
    const getRelevantDocs = traceTool(function getRelevantDocs(
        query: string
    ): string[] {
        console.log("Executing getRelevantDocs (from docs snippet)");
        const medicalDocs = [
            "Regular exercise reduces diabetes risk by 30%. Daily walking is recommended.",
            "Studies show morning exercises have better impact on blood sugar levels."
        ];

        enrichSpan({
            metrics: { retrieval_relevance: 0.5 }
        });

        return medicalDocs;
    });

    // Define generateResponse with traceModel
    const generateResponse = traceModel(function generateResponse(
        docs: string[],
        query: string
    ): string {
        console.log("Executing generateResponse (from docs snippet)");
        const prompt = `Question: ${query}\nContext: ${docs}\nAnswer:`;
        const response = "This is a test response.";

        enrichSpan({
            metrics: { contains_citations: true }
        });

        return response;
    });

    // Define ragPipeline with traceChain
    const ragPipeline = traceChain(function ragPipeline(
        query: string
    ): MedicalDocument {
        console.log("Executing ragPipeline (from docs snippet)");
        const docs = getRelevantDocs(query);
        const response = generateResponse(docs, query); // Synchronous call in this example

        enrichSession({
            metrics: {
                rag_pipeline: {
                    num_retrieved_docs: docs.length,
                    query_length: query.split(" ").length
                } as RagPipelineMetrics // Use type assertion for clarity if needed
            }
        });

        return { docs, response };
    });


    try {
        // --- Main Execution Logic (Adapted from docs snippet) ---
        // Wrap the execution in tracer.trace() to establish context
        console.log("Executing pipeline within tracer.trace()...");
        await tracer.trace(async () => {
            const query = "How does exercise affect diabetes?";
            // Note: ragPipeline is synchronous in this example, but await is harmless
            // If ragPipeline truly becomes async, the await is necessary.
            const result = ragPipeline(query);
            console.log("Pipeline executed inside tracer.trace(), result:", result);
        });
        executionSuccess = true; // Mark execution as successful if no error
        console.log("Traced execution finished.");

        // Ensure data is sent before verification (copied from new_multi_step_trace.ts)
        console.log("Waiting for data propagation after flush...");
        await tracer.flush(); // Make sure flush is called
        console.log("Tracer flushed.");
        await new Promise(resolve => setTimeout(resolve, 15000)); // Wait like original script

        // --- Verification Logic (Copied from new_multi_step_trace.ts) ---
        console.log(`Starting verification for session ID: ${currentSessionId}`);
        const sdk = new HoneyHive({
            bearerAuth: process.env.HH_API_KEY!, // Assume non-null from earlier check
            serverURL: process.env.HH_API_URL // Optional
        });

        console.log(`Fetching events for session ID: ${currentSessionId}`);
        const res = await sdk.events.getEvents({
            project: process.env.HH_PROJECT!, // Assume non-null
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
        // Expecting >= 5 events: Session Start, Outer trace span, rag_pipeline, get_relevant_docs, generate_response
        // The outer tracer.trace() adds an event compared to new_multi_step_trace.ts
        assert(res.events.length >= 5, `Expected at least 5 events for session ${currentSessionId}, found ${res.events.length}`);
        console.log(`Found ${res.events.length} events.`);

        // Check for span-level metrics
        let spanMetricsFound = {
            retrieval_relevance: false,
            contains_citations: false
        };
        // Find specific events for metrics, excluding the outer trace span and session start
        const relevantEvents = res.events.filter(e => e.eventName === 'getRelevantDocs' || e.eventName === 'generateResponse');

        relevantEvents.forEach((event: Event) => {
             if (event.metrics) {
                 if (event.eventName === 'getRelevantDocs' && 'retrieval_relevance' in event.metrics) {
                     spanMetricsFound.retrieval_relevance = true;
                     console.log(`Found retrieval_relevance metric in event: ${event.eventId} (${event.eventName})`);
                     assert.strictEqual(event.metrics.retrieval_relevance, 0.5, "retrieval_relevance value mismatch");
                 }
                 if (event.eventName === 'generateResponse' && 'contains_citations' in event.metrics) {
                      spanMetricsFound.contains_citations = true;
                      console.log(`Found contains_citations metric in event: ${event.eventId} (${event.eventName})`);
                      assert.strictEqual(event.metrics.contains_citations, true, "contains_citations value mismatch");
                 }
             }
         });


        assert(spanMetricsFound.retrieval_relevance, "'retrieval_relevance' metric not found in 'getRelevantDocs' event");
        assert(spanMetricsFound.contains_citations, "'contains_citations' metric not found in 'generateResponse' event");
        console.log("Span-level metrics verified.");

        // Check for session-level metrics (should be in the session event)
        const sessionEvent = res.events.find((e: Event) => e.eventType === 'session');
        assert(sessionEvent, "Session start event not found");
        assert(sessionEvent.metrics, "Metrics not found in session start event");
        console.log("Session event metrics:", sessionEvent.metrics);
        assert(sessionEvent.metrics.rag_pipeline, "'rag_pipeline' metric not found in session start event metrics");
        const ragPipelineMetrics = sessionEvent.metrics.rag_pipeline as RagPipelineMetrics; // Use type assertion
        assert(ragPipelineMetrics, "'rag_pipeline' metric structure is invalid");
        assert.strictEqual(ragPipelineMetrics.num_retrieved_docs, 2, "num_retrieved_docs does not match");
        assert.strictEqual(ragPipelineMetrics.query_length, 5, "query_length does not match");
        console.log("Session-level metrics verified.");
        console.log('Verification finished successfully.');
        // --- End Verification Logic ---

        return true; // Return true only if both execution and verification succeed

    } catch (error) {
        console.error(`Error during traced execution or verification for session ${currentSessionId}:`, error);
        // If execution failed, the error is already caught.
        // If verification failed, we log the error here.
        return false; // Indicate failure
    }
    // No finally block needed here as flush is now inside the try block before verification
}

export { main }; 
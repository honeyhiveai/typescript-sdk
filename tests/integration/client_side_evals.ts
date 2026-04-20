import { HoneyHiveTracer, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator } from "honeyhive/models/components/index.js";

async function main() {
    if (!process.env.HH_API_KEY) {
        throw new Error("HH_API_KEY environment variable is not set.");
    }
    if (!process.env.HH_PROJECT) {
        throw new Error("HH_PROJECT environment variable is not set.");
    }

    const tracer = await HoneyHiveTracer.init({
      apiKey: process.env.HH_API_KEY,
      project: process.env.HH_PROJECT,
      serverUrl: process.env.HH_API_URL
    });

    const currentSessionId = tracer.sessionId;

    tracer.enrichSession({
      metrics: {
        "json_validated": true,
        "num_actions": 10,
        // any other custom fields and values as you need
        "step_evals": [
          {
            "invalid_grammar": false,
            "unable_to_locate_UI": true
          }
        ],
      }
    });

    // Wait 5 seconds for data propagation
    await new Promise(resolve => setTimeout(resolve, 5000));

    const sdk = new HoneyHive({
        bearerAuth: process.env.HH_API_KEY,
        serverURL: process.env.HH_API_URL
    });

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
                    field: "session_id",
                    value: currentSessionId,
                    operator: Operator.Is
                }
            ],
        });

        // Assert that events exist and the first event has the expected metrics
        assert(res.events && res.events.length > 0, `No events found for session ${currentSessionId}`);
        const firstEvent = res.events[0];
        assert(firstEvent.metrics, `Metrics not found for the first event in session ${currentSessionId}`);
        assert.strictEqual(firstEvent.metrics.json_validated, true, "json_validated metric does not match");
        assert.strictEqual(firstEvent.metrics.num_actions, 10, "num_actions metric does not match");
        assert(Array.isArray(firstEvent.metrics.step_evals), "step_evals metric is not an array");
        assert.strictEqual(firstEvent.metrics.step_evals[0]?.invalid_grammar, false, "step_evals[0].invalid_grammar does not match");
        assert.strictEqual(firstEvent.metrics.step_evals[0]?.unable_to_locate_UI, true, "step_evals[0].unable_to_locate_UI does not match");

        console.log(`Events for session ${currentSessionId}:`, res.events);

    } catch (error) {
        console.error(`Error fetching events for session ${currentSessionId}:`, error);
        throw error; // Re-throw the error to fail the test
    }

    console.log('Finished fetching events.');
}

export { main };
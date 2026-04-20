import { HoneyHiveTracer, enrichSession, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js";

// Define types for user properties (from docs snippet)
interface CustomUserProperties {
    is_premium: boolean;
    subscription_plan: string;
    last_login: string;
}

interface UserProperties {
    user_id: string;
    user_email: string;
    user_properties: CustomUserProperties;
}

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
        sessionName: "docs-setting-user-props-test", // Distinct session name
        serverUrl: serverURL,
        verbose: true,
    });
}

// Main function to initialize tracer, run the traced logic, and verify
async function main() {
    const tracer = await initializeTracer();
    const currentSessionId = tracer.sessionId; // Capture session ID
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    // Define the user properties object (from docs snippet)
    const userProps: UserProperties = {
        user_id: "12345",
        user_email: "user@example.com",
        user_properties: {
            is_premium: true,
            subscription_plan: "pro",
            last_login: "2024-01-01T12:00:00Z"
        }
    };

    try {
        // --- Main Execution Logic (from docs snippet) ---
        // Wrap the execution logic in tracer.trace()
        // Note: Even if only enriching, trace() creates the session context and a span
        console.log("Enriching session within tracer.trace()...");
        await tracer.trace(async () => {
            // Enrich the session with user properties using standalone function
            enrichSession({
                userProperties: userProps // Note: property name is userProperties
            });
            console.log("Trace session enriched with user properties.");
        });
        console.log("Traced execution (enrichment) finished.");


        // Ensure data is sent before verification (copied from previous examples)
        console.log("Waiting for data propagation after flush...");
        await tracer.flush();
        console.log("Tracer flushed.");
        await new Promise(resolve => setTimeout(resolve, 15000)); // Wait

        // --- Verification Logic (Adapted from new_setting_user_properties.ts) ---
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
        // Expecting Session Start + the span created by tracer.trace
        assert(res.events.length >= 2, `Expected at least 2 events for session ${currentSessionId}, found ${res.events.length}`);
        console.log(`Found ${res.events.length} events.`);

        // Find the session start event
        const sessionEvent = res.events.find((e: Event) => e.eventType === 'session');
        assert(sessionEvent, "Session start event not found");
        console.log(`Found session event: ${sessionEvent.eventId}`);
        assert(sessionEvent.userProperties, "User properties not found in session start event");
        console.log("Session event user properties:", sessionEvent.userProperties);

        // Verify the user properties using deepStrictEqual against the defined userProps object
        assert.deepStrictEqual(sessionEvent.userProperties, userProps, "User properties do not match");
        console.log("User properties verified successfully.");
        // --- End Verification Logic ---

        console.log('Test finished successfully.');
        return true; // Return true only if both execution and verification succeed

    } catch (error) {
        console.error(`Error during traced execution or verification for session ${currentSessionId}:`, error);
        return false; // Indicate failure
    }
}

export { main }; 
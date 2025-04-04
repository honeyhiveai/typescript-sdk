import { HoneyHiveTracer, HoneyHive } from "honeyhive";
import assert from "assert";
import { Operator, Event } from "honeyhive/models/components/index.js";

// Define a type for the user properties structure if desired, or use any
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
      sessionName: "setting-user-props-test", // Distinct session name
      serverUrl: serverURL 
    });

    const currentSessionId = tracer.sessionId;
    console.log(`Initialized tracer with session ID: ${currentSessionId}`);

    // Define the user properties object
    const userProps: UserProperties = {
        user_id: "12345",
        user_email: "user@example.com",
        user_properties: {
            is_premium: true,
            subscription_plan: "pro",
            last_login: "2024-01-01T12:00:00Z"
        }
    };

    // Enrich the session with user properties
    console.log("Enriching session with user properties...");
    tracer.enrichSession({
      userProperties: userProps // Correct property name
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
        assert(sessionEvent.userProperties, "User properties not found in session start event");
        console.log("Session event user properties:", sessionEvent.userProperties);

        // Verify the user properties using deepStrictEqual for object comparison
        assert.deepStrictEqual(sessionEvent.userProperties, userProps, "User properties do not match");
        console.log("User properties verified successfully.");

    } catch (error) {
        console.error(`Error fetching or verifying events for session ${currentSessionId}:`, error);
        throw error; // Re-throw the error to fail the test
    }

    console.log('Test finished successfully.');
}

export { main };
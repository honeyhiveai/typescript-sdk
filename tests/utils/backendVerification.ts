import { HoneyHive } from '../../src/sdk/sdk';
import { testConfig } from './testConfig';

export class BackendVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BackendVerificationError';
  }
}

/**
 * Verify event appears in HoneyHive backend with retry logic.
 * Matches Python's verify_backend_event pattern.
 */
export async function verifyBackendEvent(params: {
  client: HoneyHive;
  project: string;
  sessionId?: string;
  uniqueIdentifier: string;
  expectedEventName?: string;
  debugContent?: boolean;
}): Promise<any> {
  const { client, project, sessionId, uniqueIdentifier, expectedEventName, debugContent } = params;

  for (let attempt = 0; attempt < testConfig.maxAttempts; attempt++) {
    try {
      // Build filters array (required by API)
      const filters = sessionId
        ? [{ field: 'session_id', value: sessionId, operator: 'is' as const }]
        : [];

      // Query events with filters and limit to avoid backend hanging
      const eventsResponse = await Promise.race([
        client.events.getEvents({
          project,
          filters,
          limit: 100, // Match Python's limit to avoid backend issues
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout after 10s')), 10000)
        ),
      ]) as any;

      // Extract events array
      const events = (eventsResponse as any)?.events || [];

      console.log(`[Attempt ${attempt + 1}] Retrieved ${events.length} events for project=${project}, sessionId=${sessionId}`);
      if (debugContent && events.length > 0) {
        console.log(`First few events:`, events.slice(0, 3).map((e: any) => ({
          eventName: e.eventName,
          eventId: e.eventId,
          metadata: e.metadata,
          unique_id_extracted: extractUniqueId(e),
        })));
      }

      // Find matching event
      let verifiedEvent = null;

      if (expectedEventName && events.length > 0) {
        // Prefer exact match on both unique_id and eventName (camelCase from API)
        verifiedEvent = events.find(
          (event: any) =>
            extractUniqueId(event) === uniqueIdentifier && event.eventName === expectedEventName
        );

        // Fallback: match by unique_id only
        if (!verifiedEvent) {
          verifiedEvent = events.find((event: any) => extractUniqueId(event) === uniqueIdentifier);
        }
      } else if (events.length > 0) {
        verifiedEvent = events[0];
      }

      if (verifiedEvent) {
        if (debugContent) {
          console.log(
            `✅ Backend verification successful for '${uniqueIdentifier}' on attempt ${attempt + 1}`
          );
          debugEventContent(verifiedEvent, uniqueIdentifier);
        }
        return verifiedEvent;
      }

      // Event not found - wait and retry
      console.log(
        `🔍 No events found with unique_id='${uniqueIdentifier}' on attempt ${attempt + 1}/${testConfig.maxAttempts}`
      );

      if (attempt < testConfig.maxAttempts - 1) {
        const baseDelay = Math.min(
          testConfig.baseDelay * Math.pow(2, attempt),
          testConfig.maxDelayCap
        );
        // Add jitter (±20%)
        const jitter = baseDelay * 0.2 * (Math.random() - 0.5);
        const delay = baseDelay + jitter;

        console.log(`⏱️  Waiting ${delay.toFixed(1)}s before retry...`);
        await sleep(delay * 1000);
      }
    } catch (error) {
      console.log(`❌ Error during backend verification attempt ${attempt + 1}: ${error}`);

      if (attempt === testConfig.maxAttempts - 1) {
        throw new BackendVerificationError(
          `Backend verification failed after ${testConfig.maxAttempts} attempts: ${error}`
        );
      }

      await sleep(1000);
    }
  }

  throw new BackendVerificationError(
    `Event with unique_id '${uniqueIdentifier}' not found in backend after ${testConfig.maxAttempts} attempts`
  );
}

/**
 * Extract unique_id from event metadata (handles nested structure)
 */
function extractUniqueId(event: any): string | null {
  const metadata = event?.metadata;
  if (!metadata) return null;

  // Check nested structure: metadata.test.unique_id
  if (metadata.test?.unique_id) {
    return String(metadata.test.unique_id);
  }

  // Check flat structure: metadata["test.unique_id"]
  if (metadata['test.unique_id']) {
    return String(metadata['test.unique_id']);
  }

  // Check inputs/outputs
  if (event.inputs?.['test.unique_id']) {
    return String(event.inputs['test.unique_id']);
  }

  if (event.outputs?.['test.unique_id']) {
    return String(event.outputs['test.unique_id']);
  }

  return null;
}

/**
 * Debug helper for event content
 */
function debugEventContent(event: any, uniqueIdentifier: string): void {
  console.log('🔍 === EVENT CONTENT DEBUG ===');
  console.log(`📋 Event Name: ${event.eventName || 'unknown'}`);
  console.log(`🆔 Event ID: ${event.eventId || 'unknown'}`);
  console.log(`🔗 Unique ID: ${uniqueIdentifier}`);

  if (event.inputs) console.log(`📥 Inputs:`, event.inputs);
  if (event.outputs) console.log(`📤 Outputs:`, event.outputs);
  if (event.metadata) console.log(`📊 Metadata:`, event.metadata);

  console.log('🔍 === END EVENT DEBUG ===');
}

/**
 * Sleep helper
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

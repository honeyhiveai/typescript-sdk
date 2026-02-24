import { HoneyHive } from '../../src/sdk/sdk';
import { HoneyHiveTracer } from '../../src/sdk/tracer';
import { verifyBackendEvent } from './backendVerification';
import { Span } from '@opentelemetry/api';

/**
 * Complete tracer span workflow: create → export → verify.
 * Matches Python's verify_tracer_span pattern.
 */
export async function verifyTracerSpan(params: {
  tracer: HoneyHiveTracer;
  client: HoneyHive;
  project: string;
  sessionId: string;
  spanName: string;
  uniqueIdentifier: string;
  spanAttributes?: Record<string, any>;
  debugContent?: boolean;
}): Promise<any> {
  const {
    tracer,
    client,
    project,
    sessionId,
    spanName,
    uniqueIdentifier,
    spanAttributes,
    debugContent,
  } = params;

  // Get the tracer instance
  const otelTracer = tracer.getTracer();

  // Create span with tracer (using OpenTelemetry API)
  const span: Span = otelTracer.startSpan(spanName);

  try {
    // Set the event name attribute (required for backend event_name field)
    span.setAttribute('honeyhive_event_name', spanName);
    span.setAttribute('honeyhive.project', project);
    span.setAttribute('test.unique_id', uniqueIdentifier);

    if (spanAttributes) {
      for (const [key, value] of Object.entries(spanAttributes)) {
        span.setAttribute(key, value);
      }
    }
  } finally {
    span.end();
  }

  // Force flush to ensure span is exported
  await tracer.flush();

  // Wait for backend processing
  await sleep(2000);

  // Verify span in backend
  return await verifyBackendEvent({
    client,
    project,
    sessionId,
    uniqueIdentifier,
    expectedEventName: spanName,
    debugContent,
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

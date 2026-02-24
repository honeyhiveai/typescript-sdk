import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { HoneyHiveTracer } from '../../src/sdk/tracer';
import { HoneyHive } from '../../src/sdk/sdk';
import {
  getIntegrationClient,
  createIntegrationTracer,
  getRealProject,
} from './fixtures';
import { generateTestId } from '../utils/idGenerator';
import { verifyTracerSpan } from '../utils/verificationHelpers';

describe('Unified EnrichSpan Integration Tests', () => {
  let integrationTracer: HoneyHiveTracer;
  let integrationClient: HoneyHive;
  let realProject: string;

  beforeEach(async () => {
    integrationTracer = await createIntegrationTracer();
    integrationClient = getIntegrationClient();
    realProject = getRealProject();
  });

  afterEach(async () => {
    if (integrationTracer) {
      try {
        await integrationTracer.flush();
      } catch (error) {
        // Silent cleanup
      }
    }
  });

  test('test_enrich_span_backwards_compatible', async () => {
    // Test basic enrichSpan API
    const { uniqueId } = generateTestId('enrich_span_compat', 'integration');
    const otelTracer = integrationTracer.getTracer();

    const span = otelTracer.startSpan('test_enrichment_backwards_compat');

    try {
      // Use enrichSpan API
      integrationTracer.enrichSpan({
        metadata: {
          user_id: '123',
          test_id: uniqueId,
          feature: 'chat',
        },
        metrics: {
          score: 0.95,
          latency_ms: 150,
        },
        feedback: {
          rating: 5,
          helpful: true,
        },
      });
    } finally {
      span.end();
    }

    // Flush and wait
    await integrationTracer.flush();
    await sleep(2000);

    // Verify in backend
    const verifiedEvent = await verifyTracerSpan({
      tracer: integrationTracer,
      client: integrationClient,
      project: realProject,
      sessionId: integrationTracer.sessionId!,
      spanName: 'test_enrichment_backwards_compat',
      uniqueIdentifier: uniqueId,
      spanAttributes: {
        'honeyhive_metadata.user_id': '123',
        'honeyhive_metadata.test_id': uniqueId,
        'honeyhive_metadata.feature': 'chat',
        'honeyhive_metrics.score': 0.95,
        'honeyhive_metrics.latency_ms': 150,
        'honeyhive_feedback.rating': 5,
        'honeyhive_feedback.helpful': true,
      },
    });

    expect(verifiedEvent).toBeTruthy();
    expect(verifiedEvent.eventName).toBe('test_enrichment_backwards_compat');
  });

  test('test_enrich_span_metadata', async () => {
    // Test metadata enrichment
    const { uniqueId } = generateTestId('enrich_metadata', 'integration');
    const otelTracer = integrationTracer.getTracer();

    const span = otelTracer.startSpan('test_metadata_enrichment');

    try {
      integrationTracer.enrichSpan({
        metadata: {
          test_id: uniqueId,
          user_id: '456',
          session_type: 'test',
          environment: 'integration',
        },
      });
    } finally {
      span.end();
    }

    await integrationTracer.flush();
    await sleep(2000);

    const verifiedEvent = await verifyTracerSpan({
      tracer: integrationTracer,
      client: integrationClient,
      project: realProject,
      sessionId: integrationTracer.sessionId!,
      spanName: 'test_metadata_enrichment',
      uniqueIdentifier: uniqueId,
      spanAttributes: {
        'honeyhive_metadata.test_id': uniqueId,
        'honeyhive_metadata.user_id': '456',
        'honeyhive_metadata.session_type': 'test',
        'honeyhive_metadata.environment': 'integration',
      },
    });

    expect(verifiedEvent).toBeTruthy();
  });

  test('test_enrich_span_metrics', async () => {
    // Test metrics enrichment
    const { uniqueId } = generateTestId('enrich_metrics', 'integration');
    const otelTracer = integrationTracer.getTracer();

    const span = otelTracer.startSpan('test_metrics_enrichment');

    try {
      integrationTracer.enrichSpan({
        metadata: { test_id: uniqueId },
        metrics: {
          score: 0.88,
          latency: 250,
          tokens: 1500,
          cost: 0.003,
        },
      });
    } finally {
      span.end();
    }

    await integrationTracer.flush();
    await sleep(2000);

    const verifiedEvent = await verifyTracerSpan({
      tracer: integrationTracer,
      client: integrationClient,
      project: realProject,
      sessionId: integrationTracer.sessionId!,
      spanName: 'test_metrics_enrichment',
      uniqueIdentifier: uniqueId,
      spanAttributes: {
        'honeyhive_metadata.test_id': uniqueId,
        'honeyhive_metrics.score': 0.88,
        'honeyhive_metrics.latency': 250,
        'honeyhive_metrics.tokens': 1500,
        'honeyhive_metrics.cost': 0.003,
      },
    });

    expect(verifiedEvent).toBeTruthy();
  });

  // Additional tests following the same pattern would include:
  // - test_enrich_span_feedback - Feedback enrichment
  // - test_enrich_span_inputs_outputs - I/O enrichment
  // - test_enrich_span_config - Config enrichment
  // - test_enrich_span_multiple_fields - Combined enrichment
  // - test_enrich_span_nested_structures - Nested metadata
  // - test_enrich_span_overwrites - Overwrite behavior
  // - test_enrich_span_event_name - Custom event naming
  // - test_enrich_span_error - Error enrichment
  // - test_main_enrich_span_integration - Module-level API
  //
  // These tests all follow the same pattern:
  // 1. Generate unique ID
  // 2. Create span and enrich with specific data
  // 3. Flush and wait
  // 4. Verify backend event with verifyTracerSpan
});

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

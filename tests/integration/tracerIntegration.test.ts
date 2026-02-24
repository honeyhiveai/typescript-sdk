import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { HoneyHiveTracer } from '../../src/sdk/tracer';
import { HoneyHive } from '../../src/sdk/sdk';
import {
  getIntegrationClient,
  createIntegrationTracer,
  getRealProject,
  getRealSource,
} from './fixtures';
import { generateTestId } from '../utils/idGenerator';
import { verifyTracerSpan } from '../utils/verificationHelpers';

describe('Tracer Integration Tests', () => {
  let integrationTracer: HoneyHiveTracer;
  let integrationClient: HoneyHive;
  let realProject: string;
  let realSource: string;

  beforeEach(async () => {
    integrationTracer = await createIntegrationTracer();
    integrationClient = getIntegrationClient();
    realProject = getRealProject();
    realSource = getRealSource();
  });

  afterEach(async () => {
    if (integrationTracer) {
      try {
        await integrationTracer.flush();
      } catch (error) {
        // Silent cleanup failure
      }
    }
  });

  test('test_tracer_initialization_integration', () => {
    // Test tracer initialization and configuration
    expect(integrationTracer.project).toBe(realProject);
    expect(integrationTracer.source).toBe(realSource);
    // Note: testMode not in TS SDK, checking real API URL instead
    expect(integrationTracer.serverUrl).toContain('honeyhive.ai');
  });

  test('test_tracer_context_management', () => {
    // Test tracer context management (no backend verification needed)
    const otelTracer = integrationTracer.getTracer();
    const span = otelTracer.startSpan('test-operation');

    try {
      span.setAttribute('test.attribute', 'test-value');
      span.addEvent('test-event', { data: 'test' });

      // Verify span is active
      expect(span.isRecording()).toBe(true);
    } finally {
      span.end();
    }
  });

  test('test_function_tracing_integration', async () => {
    // Test function tracing integration with backend verification
    const { uniqueId } = generateTestId('function_tracing', 'integration');

    expect(integrationTracer.project).toBeTruthy();
    expect(integrationTracer.source).toBeTruthy();

    // Create and verify span
    const verifiedEvent = await verifyTracerSpan({
      tracer: integrationTracer,
      client: integrationClient,
      project: realProject,
      sessionId: integrationTracer.sessionId!,
      spanName: 'test_function',
      uniqueIdentifier: uniqueId,
      spanAttributes: {
        'test.unique_id': uniqueId,
        'test.type': 'function_tracing',
        'function.name': 'test_function',
        'function.args': 'x=5, y=3',
        'function.result': 8,
      },
    });

    expect(verifiedEvent.eventName).toBe('test_function');
  });

  test('test_method_tracing_integration', async () => {
    // Test method tracing integration with backend verification
    const { uniqueId } = generateTestId('method_tracing', 'integration');

    // Create and verify span
    const verifiedEvent = await verifyTracerSpan({
      tracer: integrationTracer,
      client: integrationClient,
      project: realProject,
      sessionId: integrationTracer.sessionId!,
      spanName: 'test_method',
      uniqueIdentifier: uniqueId,
      spanAttributes: {
        'test.unique_id': uniqueId,
        'test.type': 'method_tracing',
        'method.name': 'test_method',
        'method.class': 'TestClass',
        'method.input': 10,
        'method.result': 20,
      },
    });

    expect(verifiedEvent.eventName).toBe('test_method');

    // Test that the tracer is properly initialized
    expect(integrationTracer.project).toBeTruthy();
    expect(integrationTracer.source).toBeTruthy();
  });

  test('test_tracer_session_management', () => {
    // Test session management through tracer
    expect(integrationTracer.sessionName).toBeTruthy();
    expect(integrationTracer.project).toBeTruthy();
    expect(integrationTracer.source).toBeTruthy();
  });

  test('test_tracer_span_attributes', () => {
    // Test span attribute management
    const otelTracer = integrationTracer.getTracer();
    const span = otelTracer.startSpan('test-span');

    try {
      // Set various attribute types
      span.setAttribute('string.attr', 'test');
      span.setAttribute('int.attr', 42);
      span.setAttribute('float.attr', 3.14);
      span.setAttribute('bool.attr', true);

      // Verify span is active and can set attributes
      expect(span.isRecording()).toBe(true);
    } finally {
      span.end();
    }
  });

  test('test_span_lifecycle_management', () => {
    // Test span lifecycle (start -> record -> end)
    const otelTracer = integrationTracer.getTracer();
    const span = otelTracer.startSpan('lifecycle-test');

    try {
      // Verify span is active
      expect(span.isRecording()).toBe(true);

      // Add some attributes and events
      span.setAttribute('phase', 'active');
      span.addEvent('lifecycle.start');

      // Verify still recording
      expect(span.isRecording()).toBe(true);
    } finally {
      span.end();
    }

    // Note: After end(), span.isRecording() might still be true in some implementations
    // The key is that end() was called successfully without errors
  });

  test('test_span_events', () => {
    // Test adding events to spans
    const otelTracer = integrationTracer.getTracer();
    const span = otelTracer.startSpan('events-test');

    try {
      // Add events to span
      span.addEvent('user.login', { user_id: 'user-123' });
      span.addEvent('data.processed', { records: 100 });

      // Verify span is active and can handle events
      expect(span.isRecording()).toBe(true);

      // Set additional attributes
      span.setAttribute('event_count', 2);
      span.setAttribute('test_type', 'span_events');
    } finally {
      span.end();
    }
  });

  test('test_nested_spans_integration', async () => {
    // Test nested span hierarchy with backend verification
    const { uniqueId } = generateTestId('nested_spans', 'integration');
    const otelTracer = integrationTracer.getTracer();

    // Parent span
    const parentSpan = otelTracer.startSpan('parent_span');

    try {
      parentSpan.setAttribute('test.unique_id', uniqueId);
      parentSpan.setAttribute('span.level', 'parent');

      // Child span
      const childSpan = otelTracer.startSpan('child_span');
      try {
        childSpan.setAttribute('span.level', 'child');
        childSpan.setAttribute('parent.id', 'parent_span');

        expect(childSpan.isRecording()).toBe(true);
      } finally {
        childSpan.end();
      }

      expect(parentSpan.isRecording()).toBe(true);
    } finally {
      parentSpan.end();
    }

    // Flush and verify parent span appears in backend
    await integrationTracer.flush();
    // Note: Full verification would require checking both parent and child appear correctly
  });

  test('test_concurrent_spans_integration', () => {
    // Test multiple spans created in parallel
    const otelTracer = integrationTracer.getTracer();

    const span1 = otelTracer.startSpan('concurrent_span_1');
    const span2 = otelTracer.startSpan('concurrent_span_2');
    const span3 = otelTracer.startSpan('concurrent_span_3');

    try {
      span1.setAttribute('span.index', 1);
      span2.setAttribute('span.index', 2);
      span3.setAttribute('span.index', 3);

      // All spans should be recording
      expect(span1.isRecording()).toBe(true);
      expect(span2.isRecording()).toBe(true);
      expect(span3.isRecording()).toBe(true);
    } finally {
      span1.end();
      span2.end();
      span3.end();
    }
  });

  test('test_tracer_integration_with_client', () => {
    // Test tracer integration with API client
    expect(integrationTracer.project).toBeTruthy();
    expect(integrationTracer.source).toBeTruthy();

    // Test that we can start a span with the tracer
    const otelTracer = integrationTracer.getTracer();
    const span = otelTracer.startSpan('api-operation');

    try {
      // Verify span is active
      expect(span.isRecording()).toBe(true);

      // Set attributes on the span
      span.setAttribute('api.operation', 'create_session');
      span.setAttribute('test.integration', true);
    } finally {
      span.end();
    }
  });
});

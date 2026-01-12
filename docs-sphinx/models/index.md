# Models Reference

This section contains the data model definitions used by the HoneyHive TypeScript SDK.

## Core Models

### Session

The Session model represents a user session for tracking interactions.

```typescript
interface Session {
  project: string;
  sessionName: string;
  source: string;
  sessionId?: string;
  childrenIds?: string[];
  config?: Record<string, any>;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  userProperties?: Record<string, any>;
  metrics?: Record<string, any>;
  feedback?: Record<string, any>;
  metadata?: Record<string, any>;
}
```

### Event

The Event model represents a logged event or trace.

```typescript
interface Event {
  project: string;
  eventName: string;
  eventType: "model" | "tool" | "chain";
  eventId?: string;
  sessionId?: string;
  parentId?: string;
  childrenIds?: string[];
  config?: Record<string, any>;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  error?: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
  feedback?: Record<string, any>;
  metrics?: Record<string, any>;
  userProperties?: Record<string, any>;
}
```

### Dataset

The Dataset model represents a collection of data points for evaluation.

```typescript
interface Dataset {
  name: string;
  project: string;
  description?: string;
  type?: string;
  datapoints?: Datapoint[];
  linkedEvals?: string[];
  metadata?: Record<string, any>;
}
```

### Datapoint

The Datapoint model represents a single data point in a dataset.

```typescript
interface Datapoint {
  inputs: Record<string, any>;
  groundTruth?: Record<string, any>;
  linkedEvent?: string;
  metadata?: Record<string, any>;
}
```

## Response Models

The SDK also includes various response models for API operations. See the full API documentation for details on specific response types.

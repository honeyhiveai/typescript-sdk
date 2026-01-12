# Getting Started

This guide will help you get started with the HoneyHive TypeScript SDK.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A HoneyHive account with an API key

## Installation

Install the SDK using npm:

```bash
npm install honeyhive
```

Or using yarn:

```bash
yarn add honeyhive
```

## Configuration

To use the SDK, you'll need to configure it with your HoneyHive API key:

```typescript
import { HoneyHive } from "honeyhive";

const client = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});
```

## Basic Usage

### Starting a Session

```typescript
const result = await client.session.startSession({
  session: {
    project: "my-project",
    sessionName: "my-session",
    source: "my-app",
  },
});
```

### Logging Events

```typescript
await client.events.createEvent({
  event: {
    project: "my-project",
    eventName: "my-event",
    eventType: "model",
    config: {
      model: "gpt-4",
    },
  },
});
```

## Next Steps

- Explore the [SDK Reference](sdk/index.md) for detailed API documentation
- Check out the [Models Reference](models/index.md) for data type definitions

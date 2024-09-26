# Session
(*session*)

## Overview

### Available Operations

* [startSession](#startsession) - Start a new session
* [getSession](#getsession) - Retrieve a session

## startSession

Start a new session

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "chat_history": [
          {
            "role": "system",
            "content": "Answer the user's question only using provided context.\n" +
            "\n" +
            "Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
        "context": "Hello world",
        "question": "What is in the context?",
      },
      outputs: {
        "content": "Hello world",
        "role": "assistant",
      },
      error: "<value>",
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {

      },
      feedback: {

      },
      metadata: {

      },
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  // Handle the result
  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { sessionStartSession } from "honeyhive/funcs/sessionStartSession.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await sessionStartSession(honeyHive, {
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "chat_history": [
          {
            "role": "system",
            "content": "Answer the user's question only using provided context.\n" +
            "\n" +
            "Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
        "context": "Hello world",
        "question": "What is in the context?",
      },
      outputs: {
        "content": "Hello world",
        "role": "assistant",
      },
      error: "<value>",
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {
  
      },
      feedback: {
  
      },
      metadata: {
  
      },
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result);
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.StartSessionRequestBody](../../models/operations/startsessionrequestbody.md)                                                                                       | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.StartSessionResponseBody](../../models/operations/startsessionresponsebody.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## getSession

Retrieve a session

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.getSession("<value>");

  // Handle the result
  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { sessionGetSession } from "honeyhive/funcs/sessionGetSession.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await sessionGetSession(honeyHive, "<value>");

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result);
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sessionId`                                                                                                                                                                    | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.Event](../../models/components/event.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

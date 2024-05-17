# Session
(*session*)

### Available Operations

* [startSession](#startsession) - Start a new session
* [getSession](#getsession) - Retrieve a session

## startSession

Start a new session

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      config: {
        "key": "<value>",
      },
      inputs: {
        "context": "Hello world",
        "question": "What is in the context?",
        "chat_history": [
          {
            "role": "system",
            "content": "Answer the user's question only using provided context.

            Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
      },
      outputs: {
        "role": "assistant",
        "content": "Hello world",
      },
      error: null,
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

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `request`                                                                                | [operations.StartSessionRequestBody](../../models/operations/startsessionrequestbody.md) | :heavy_check_mark:                                                                       | The request object to use for the request.                                               |
| `config`                                                                                 | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                             | :heavy_minus_sign:                                                                       | Available config options for making requests.                                            |


### Response

**Promise<[operations.StartSessionResponse](../../models/operations/startsessionresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getSession

Retrieve a session

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { GetSessionRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";

  const res = await sdk.session.getSession(sessionId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `sessionId`                                                  | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetSessionResponse](../../models/operations/getsessionresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

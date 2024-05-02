# Session
(*session*)

### Available Operations

* [startSession](#startsession) - Start a new session
* [deleteSession](#deletesession) - Delete a session
* [getSession](#getsession) - Retrieve a session
* [processEventTrace](#processeventtrace) - Process an event trace for a given session

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
      childrenIds: [
        "<value>",
      ],
      config: {
        "key": "<value>",
      },
      feedback: {
        "key": "<value>",
      },
      inputs: {
        "key": "<value>",
      },
      metadata: {
        "key": "<value>",
      },
      metrics: {
        "key": "<value>",
      },
      outputs: {
        "key": "<value>",
      },
      project: "<value>",
      sessionName: "<value>",
      source: "<value>",
      userProperties: {
        "key": "<value>",
      },
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

## deleteSession

Delete a session

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { DeleteSessionRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";

  const res = await sdk.session.deleteSession(sessionId);

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

**Promise<[operations.DeleteSessionResponse](../../models/operations/deletesessionresponse.md)>**
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

## processEventTrace

Process an event trace for a given session

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { ProcessEventTraceRequest, ProcessEventTraceRequestBody } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const sessionId: string = "<value>";
const requestBody: ProcessEventTraceRequestBody = {
  logs: [
    {
      "key": "<value>",
    },
  ],
};

  const res = await sdk.session.processEventTrace(sessionId, requestBody);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                          | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `sessionId`                                                                                        | *string*                                                                                           | :heavy_check_mark:                                                                                 | The ID of the session to which this event trace belongs                                            |
| `requestBody`                                                                                      | [operations.ProcessEventTraceRequestBody](../../models/operations/processeventtracerequestbody.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `config`                                                                                           | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                       | :heavy_minus_sign:                                                                                 | Available config options for making requests.                                                      |


### Response

**Promise<[operations.ProcessEventTraceResponse](../../models/operations/processeventtraceresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

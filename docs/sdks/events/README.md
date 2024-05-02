# Events
(*events*)

### Available Operations

* [createEvent](#createevent) - Create a new event
* [updateEvent](#updateevent) - Update an event
* [deleteEvent](#deleteevent) - Delete an event

## createEvent

Please refer to our instrumentation guide for detailed information

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { EventType } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.createEvent({
    event: {
      childrenIds: [
        "<value>",
      ],
      config: {
        "key": "<value>",
      },
      eventName: "<value>",
      eventType: EventType.Model,
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

| Parameter                                                                              | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `request`                                                                              | [operations.CreateEventRequestBody](../../models/operations/createeventrequestbody.md) | :heavy_check_mark:                                                                     | The request object to use for the request.                                             |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.CreateEventResponse](../../models/operations/createeventresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## updateEvent

Update an event

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.updateEvent({
    eventId: "<value>",
    feedback: {
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
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                              | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `request`                                                                              | [operations.UpdateEventRequestBody](../../models/operations/updateeventrequestbody.md) | :heavy_check_mark:                                                                     | The request object to use for the request.                                             |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.UpdateEventResponse](../../models/operations/updateeventresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteEvent

Delete an event

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { DeleteEventRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const eventId: string = "<value>";
const project: string = "<value>";

  const res = await sdk.events.deleteEvent(eventId, project);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `eventId`                                                    | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `project`                                                    | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteEventResponse](../../models/operations/deleteeventresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

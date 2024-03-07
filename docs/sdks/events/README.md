# Events
(*events*)

### Available Operations

* [postEvents](#postevents) - Create a new event
* [putEvents](#putevents) - Update an event
* [deleteEventsEventId](#deleteeventseventid) - Delete an event

## postEvents

Please refer to our instrumentation guide for detailed information

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { EventType } from "HoneyHive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.postEvents({
    event: {
      childrenIds: [
        "<value>",
      ],
      config: {},
      eventName: "<value>",
      eventType: EventType.Chain,
      feedback: {},
      inputs: {},
      metadata: {},
      metrics: {},
      outputs: {},
      project: "<value>",
      source: "<value>",
      userProperties: {},
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                            | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `request`                                                                            | [operations.PostEventsRequestBody](../../models/operations/posteventsrequestbody.md) | :heavy_check_mark:                                                                   | The request object to use for the request.                                           |
| `config`                                                                             | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                         | :heavy_minus_sign:                                                                   | Available config options for making requests.                                        |


### Response

**Promise<[operations.PostEventsResponse](../../models/operations/posteventsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putEvents

Update an event

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.events.putEvents({
    eventId: "<value>",
    feedback: {},
    metadata: {},
    metrics: {},
    outputs: {},
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                          | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `request`                                                                          | [operations.PutEventsRequestBody](../../models/operations/puteventsrequestbody.md) | :heavy_check_mark:                                                                 | The request object to use for the request.                                         |
| `config`                                                                           | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                       | :heavy_minus_sign:                                                                 | Available config options for making requests.                                      |


### Response

**Promise<[operations.PutEventsResponse](../../models/operations/puteventsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteEventsEventId

Delete an event

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteEventsEventIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const eventId: string = "<value>";
const project: string = "<value>";

  const res = await sdk.events.deleteEventsEventId(eventId, project);

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

**Promise<[operations.DeleteEventsEventIdResponse](../../models/operations/deleteeventseventidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

# Runs
(*runs*)

### Available Operations

* [createRun](#createrun) - Create a new evaluation run
* [getRuns](#getruns) - Get a list of evaluation runs
* [getRun](#getrun) - Get details of an evaluation run
* [updateRun](#updaterun) - Update an evaluation run
* [deleteRun](#deleterun) - Delete an evaluation run

## createRun

Create a new evaluation run

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { Status } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.runs.createRun({
    project: "<value>",
    name: "<value>",
    eventIds: [
      "1b590040-fd4d-40db-a8d8-d6e550cfa9f3",
    ],
    datapointIds: [
      "<value>",
    ],
    configuration: {
      "key": "<value>",
    },
    metadata: {
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

| Parameter                                                                  | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `request`                                                                  | [components.CreateRunRequest](../../models/components/createrunrequest.md) | :heavy_check_mark:                                                         | The request object to use for the request.                                 |
| `config`                                                                   | [AxiosRequestConfig](https://axios-http.com/docs/req_config)               | :heavy_minus_sign:                                                         | Available config options for making requests.                              |


### Response

**Promise<[operations.CreateRunResponse](../../models/operations/createrunresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getRuns

Get a list of evaluation runs

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { GetRunsRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const project: string = "<value>";

  const res = await sdk.runs.getRuns(project);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `project`                                                    | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetRunsResponse](../../models/operations/getrunsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getRun

Get details of an evaluation run

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { GetRunRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const runId: string = "<value>";

  const res = await sdk.runs.getRun(runId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `runId`                                                      | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetRunResponse](../../models/operations/getrunresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## updateRun

Update an evaluation run

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { UpdateRunRequest, UpdateRunRequestStatus } from "honeyhive/dist/models/components";
import { UpdateRunRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const runId: string = "<value>";
const updateRunRequest: UpdateRunRequest = {
  eventIds: [
    "8fd0a069-f113-4c62-aab3-2506a8d15e19",
  ],
  datapointIds: [
    "<value>",
  ],
  configuration: {
    "key": "<value>",
  },
  metadata: {
    "key": "<value>",
  },
};

  const res = await sdk.runs.updateRun(runId, updateRunRequest);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                  | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `runId`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `updateRunRequest`                                                         | [components.UpdateRunRequest](../../models/components/updaterunrequest.md) | :heavy_check_mark:                                                         | N/A                                                                        |
| `config`                                                                   | [AxiosRequestConfig](https://axios-http.com/docs/req_config)               | :heavy_minus_sign:                                                         | Available config options for making requests.                              |


### Response

**Promise<[operations.UpdateRunResponse](../../models/operations/updaterunresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteRun

Delete an evaluation run

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { DeleteRunRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const runId: string = "<value>";

  const res = await sdk.runs.deleteRun(runId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `runId`                                                      | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteRunResponse](../../models/operations/deleterunresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

# Datapoints
(*datapoints*)

### Available Operations

* [getDatapoints](#getdatapoints) - Retrieve a list of datapoints
* [createDatapoint](#createdatapoint) - Create a new datapoint
* [updateDatapoint](#updatedatapoint) - Update a specific datapoint
* [deleteDatapoint](#deletedatapoint) - Delete a specific datapoint
* [getDatapoint](#getdatapoint) - Retrieve a specific datapoint

## getDatapoints

Retrieve a list of datapoints

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetDatapointsRequest, QueryParamType } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const project: string = "<value>";
const type: QueryParamType = QueryParamType.Evaluation;
const datapointIds: string[] = [
  "<value>",
];

  const res = await sdk.datapoints.getDatapoints(project, type, datapointIds);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                              | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `project`                                                              | *string*                                                               | :heavy_check_mark:                                                     | Project ID to filter datapoints                                        |
| `type`                                                                 | [operations.QueryParamType](../../models/operations/queryparamtype.md) | :heavy_minus_sign:                                                     | Type of data - "evaluation" or "event"                                 |
| `datapointIds`                                                         | *string*[]                                                             | :heavy_minus_sign:                                                     | List of datapoint ids to fetch                                         |
| `config`                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)           | :heavy_minus_sign:                                                     | Available config options for making requests.                          |


### Response

**Promise<[operations.GetDatapointsResponse](../../models/operations/getdatapointsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## createDatapoint

Create a new datapoint

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { CreateDatapointRequestType } from "HoneyHive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.datapoints.createDatapoint({
    groundTruth: {
      "key": "<value>",
    },
    inputs: {},
    linkedDatasets: [
      "<value>",
    ],
    linkedEvals: [
      "<value>",
    ],
    metadata: {},
    project: "<value>",
    type: CreateDatapointRequestType.Evaluation,
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
| `request`                                                                              | [components.CreateDatapointRequest](../../models/components/createdatapointrequest.md) | :heavy_check_mark:                                                                     | The request object to use for the request.                                             |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.CreateDatapointResponse](../../models/operations/createdatapointresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## updateDatapoint

Update a specific datapoint

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import {
  UpdateDatapointRequest,
  UpdateDatapointRequestHistory,
  UpdateDatapointRequestInputs,
  UpdateDatapointRequestMetadata,
} from "HoneyHive/dist/models/components";
import { UpdateDatapointRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const datapointId: string = "<value>";
const updateDatapointRequest: UpdateDatapointRequest = {
  groundTruth: {
    "key": "<value>",
  },
  history: [
    {},
  ],
  inputs: {},
  linkedDatasets: [
    "<value>",
  ],
  linkedEvals: [
    "<value>",
  ],
  metadata: {},
};

  const res = await sdk.datapoints.updateDatapoint(datapointId, updateDatapointRequest);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                              | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `datapointId`                                                                          | *string*                                                                               | :heavy_check_mark:                                                                     | ID of datapoint to update                                                              |
| `updateDatapointRequest`                                                               | [components.UpdateDatapointRequest](../../models/components/updatedatapointrequest.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `config`                                                                               | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                           | :heavy_minus_sign:                                                                     | Available config options for making requests.                                          |


### Response

**Promise<[operations.UpdateDatapointResponse](../../models/operations/updatedatapointresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteDatapoint

Delete a specific datapoint

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteDatapointRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.datapoints.deleteDatapoint(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | Datapoint ID                                                 |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteDatapointResponse](../../models/operations/deletedatapointresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getDatapoint

Retrieve a specific datapoint

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetDatapointRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.datapoints.getDatapoint(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | Datapoint ID                                                 |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetDatapointResponse](../../models/operations/getdatapointresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

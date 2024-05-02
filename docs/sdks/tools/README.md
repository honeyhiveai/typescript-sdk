# Tools
(*tools*)

### Available Operations

* [deleteTool](#deletetool) - Delete a tool
* [getTools](#gettools) - Retrieve a list of tools
* [createTool](#createtool) - Create a new tool
* [updateTool](#updatetool) - Update an existing tool

## deleteTool

Delete a tool

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { DeleteToolRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const functionId: string = "<value>";

  const res = await sdk.tools.deleteTool(functionId);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `functionId`                                                 | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteToolResponse](../../models/operations/deletetoolresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## getTools

Retrieve a list of tools

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.tools.getTools();

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetToolsResponse](../../models/operations/gettoolsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## createTool

Create a new tool

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { CreateToolRequestType } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.tools.createTool({
    name: "<value>",
    parameters: {
      "key": "<value>",
    },
    task: "<value>",
    type: CreateToolRequestType.Tool,
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                    | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `request`                                                                    | [components.CreateToolRequest](../../models/components/createtoolrequest.md) | :heavy_check_mark:                                                           | The request object to use for the request.                                   |
| `config`                                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                 | :heavy_minus_sign:                                                           | Available config options for making requests.                                |


### Response

**Promise<[operations.CreateToolResponse](../../models/operations/createtoolresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## updateTool

Update an existing tool

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.tools.updateTool({
    id: "<id>",
    name: "<value>",
    parameters: {
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

| Parameter                                                                    | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `request`                                                                    | [components.UpdateToolRequest](../../models/components/updatetoolrequest.md) | :heavy_check_mark:                                                           | The request object to use for the request.                                   |
| `config`                                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                 | :heavy_minus_sign:                                                           | Available config options for making requests.                                |


### Response

**Promise<[operations.UpdateToolResponse](../../models/operations/updatetoolresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

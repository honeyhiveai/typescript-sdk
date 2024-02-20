# Prompts
(*prompts*)

### Available Operations

* [getPrompts](#getprompts) - Retrieve a list of prompts based on query parameters.
* [postPrompts](#postprompts) - Create a new prompt.
* [deletePromptsId](#deletepromptsid) - Delete an existing prompt.
* [putPromptsId](#putpromptsid) - Update an existing prompt.

## getPrompts

Retrieve a list of prompts based on query parameters.

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { GetPromptsRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const task: string = "<value>";
const name: string = "<value>";

  const res = await sdk.prompts.getPrompts(task, name);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `task`                                                       | *string*                                                     | :heavy_check_mark:                                           | Task associated with the prompts.                            |
| `name`                                                       | *string*                                                     | :heavy_minus_sign:                                           | Optional name to filter prompts.                             |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetPromptsResponse](../../models/operations/getpromptsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## postPrompts

Create a new prompt.

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.prompts.postPrompts({
    id: "<id>",
    task: "<value>",
    version: "<value>",
    model: "Cruze",
    provider: "<value>",
    hyperparameters: {},
    text: "<value>",
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `request`                                                    | [components.Prompt](../../models/components/prompt.md)       | :heavy_check_mark:                                           | The request object to use for the request.                   |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.PostPromptsResponse](../../models/operations/postpromptsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deletePromptsId

Delete an existing prompt.

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { DeletePromptsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.prompts.deletePromptsId(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | ID of the prompt to delete.                                  |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeletePromptsIdResponse](../../models/operations/deletepromptsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## putPromptsId

Update an existing prompt.

### Example Usage

```typescript
import { HoneyHive } from "HoneyHive";
import { Hyperparameters, Prompt } from "HoneyHive/dist/models/components";
import { PutPromptsIdRequest } from "HoneyHive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";
const prompt: Prompt = {
  id: "<id>",
  task: "<value>",
  version: "<value>",
  model: "V90",
  provider: "<value>",
  hyperparameters: {},
  text: "<value>",
};

  const res = await sdk.prompts.putPromptsId(id, prompt);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | ID of the prompt to update.                                  |
| `prompt`                                                     | [components.Prompt](../../models/components/prompt.md)       | :heavy_check_mark:                                           | N/A                                                          |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.PutPromptsIdResponse](../../models/operations/putpromptsidresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

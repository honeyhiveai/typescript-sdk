# Configurations
(*configurations*)

### Available Operations

* [getConfigurations](#getconfigurations) - Retrieve a list of configurations
* [createConfiguration](#createconfiguration) - Create a new configuration
* [updateConfiguration](#updateconfiguration) - Update an existing configuration
* [deleteConfiguration](#deleteconfiguration) - Delete a configuration

## getConfigurations

Retrieve a list of configurations

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { Env, GetConfigurationsRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const project: string = "<value>";
const env: Env = Env.Dev;
const name: string = "<value>";

  const res = await sdk.configurations.getConfigurations(project, env, name);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `project`                                                    | *string*                                                     | :heavy_check_mark:                                           | Project name for configuration like `Example Project`        |
| `env`                                                        | [operations.Env](../../models/operations/env.md)             | :heavy_minus_sign:                                           | Environment - "dev", "staging" or "prod"                     |
| `name`                                                       | *string*                                                     | :heavy_minus_sign:                                           | The name of the configuration like `v0`                      |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.GetConfigurationsResponse](../../models/operations/getconfigurationsresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## createConfiguration

Create a new configuration

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { PostConfigurationRequestEnv } from "honeyhive/dist/models/components";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });

  const res = await sdk.configurations.createConfiguration({
    project: "660d7ba7995cacccce4d299e",
    name: "function-v0",
    provider: "openai",
    parameters: {
      "call_type": "chat",
      "model": "gpt-4-turbo-preview",
      "hyperparameters": "<value>",
      "selectedFunctions": "<value>",
      "functionCallParams": "auto",
      "forceFunction": "<value>",
      "template": "<value>",
    },
    env: [
      PostConfigurationRequestEnv.Staging,
    ],
    userProperties: {
      "user_id": "google-oauth2|108897808434934946583",
      "user_name": "Dhruv Singh",
      "user_picture": "https://lh3.googleusercontent.com/a/ACg8ocLyQilNtK9RIv4M0p-0FBSbxljBP0p5JabnStku1AQKtFSK=s96-c",
      "user_email": "dhruv@honeyhive.ai",
    },
  });

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                  | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `request`                                                                                  | [components.PostConfigurationRequest](../../models/components/postconfigurationrequest.md) | :heavy_check_mark:                                                                         | The request object to use for the request.                                                 |
| `config`                                                                                   | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                               | :heavy_minus_sign:                                                                         | Available config options for making requests.                                              |


### Response

**Promise<[operations.CreateConfigurationResponse](../../models/operations/createconfigurationresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## updateConfiguration

Update an existing configuration

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { PutConfigurationRequest, PutConfigurationRequestEnv, PutConfigurationRequestType } from "honeyhive/dist/models/components";
import { UpdateConfigurationRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";
const putConfigurationRequest: PutConfigurationRequest = {
  project: "New Project",
  name: "function-v0",
  provider: "openai",
  parameters: {
    "call_type": "chat",
    "model": "gpt-4-turbo-preview",
    "hyperparameters": "<value>",
    "responseFormat": "<value>",
    "selectedFunctions": "<value>",
    "functionCallParams": "auto",
    "forceFunction": "<value>",
    "template": "<value>",
  },
  env: [
    PutConfigurationRequestEnv.Staging,
  ],
  type: PutConfigurationRequestType.Llm,
  userProperties: {
    "user_id": "google-oauth2|108897808434934946583",
    "user_name": "Dhruv Singh",
    "user_picture": "https://lh3.googleusercontent.com/a/ACg8ocLyQilNtK9RIv4M0p-0FBSbxljBP0p5JabnStku1AQKtFSK=s96-c",
    "user_email": "dhruv@honeyhive.ai",
  },
};

  const res = await sdk.configurations.updateConfiguration(id, putConfigurationRequest);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Required                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | *string*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Configuration ID like `6638187d505c6812e4043f24`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `putConfigurationRequest`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | [components.PutConfigurationRequest](../../models/components/putconfigurationrequest.md)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | :heavy_check_mark:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | N/A                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | {<br/>"project": "New Project",<br/>"name": "function-v0",<br/>"provider": "openai",<br/>"parameters": {<br/>"call_type": "chat",<br/>"model": "gpt-4-turbo-preview",<br/>"hyperparameters": {<br/>"temperature": 0,<br/>"max_tokens": 1000,<br/>"top_p": 1,<br/>"top_k": -1,<br/>"frequency_penalty": 0,<br/>"presence_penalty": 0,<br/>"stop_sequences": []<br/>},<br/>"responseFormat": {<br/>"type": "text"<br/>},<br/>"selectedFunctions": [<br/>{<br/>"id": "64e3ba90e81f9b3a3808c27f",<br/>"name": "get_google_information",<br/>"description": "Get information from Google when you do not have that information in your context",<br/>"parameters": {<br/>"type": "object",<br/>"properties": {<br/>"query": {<br/>"type": "string",<br/>"description": "The query asked by the user"<br/>}<br/>},<br/>"required": [<br/>"query"<br/>]<br/>}<br/>}<br/>],<br/>"functionCallParams": "auto",<br/>"forceFunction": {},<br/>"template": [<br/>{<br/>"role": "system",<br/>"content": "You are a web search assistant."<br/>},<br/>{<br/>"role": "user",<br/>"content": "{{ query }}"<br/>}<br/>]<br/>},<br/>"env": [<br/>"staging"<br/>],<br/>"type": "LLM",<br/>"tags": [],<br/>"user_properties": {<br/>"user_id": "google-oauth2\|108897808434934946583",<br/>"user_name": "Dhruv Singh",<br/>"user_picture": "https://lh3.googleusercontent.com/a/ACg8ocLyQilNtK9RIv4M0p-0FBSbxljBP0p5JabnStku1AQKtFSK=s96-c",<br/>"user_email": "dhruv@honeyhive.ai"<br/>}<br/>} |
| `config`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | [AxiosRequestConfig](https://axios-http.com/docs/req_config)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | :heavy_minus_sign:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Available config options for making requests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |


### Response

**Promise<[operations.UpdateConfigurationResponse](../../models/operations/updateconfigurationresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

## deleteConfiguration

Delete a configuration

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";
import { DeleteConfigurationRequest } from "honeyhive/dist/models/operations";

async function run() {
  const sdk = new HoneyHive({
    bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
  });
const id: string = "<value>";

  const res = await sdk.configurations.deleteConfiguration(id);

  if (res.statusCode == 200) {
    // handle response
  }
}

run();
```

### Parameters

| Parameter                                                    | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `id`                                                         | *string*                                                     | :heavy_check_mark:                                           | Configuration ID like `6638187d505c6812e4043f24`             |
| `config`                                                     | [AxiosRequestConfig](https://axios-http.com/docs/req_config) | :heavy_minus_sign:                                           | Available config options for making requests.                |


### Response

**Promise<[operations.DeleteConfigurationResponse](../../models/operations/deleteconfigurationresponse.md)>**
### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

# Configurations
(*configurations*)

## Overview

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

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.configurations.getConfigurations("<value>");
  
  // Handle the result
  console.log(result)
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { configurationsGetConfigurations } from "honeyhive/funcs/configurationsGetConfigurations.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await configurationsGetConfigurations(honeyHive, "<value>");

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  // Handle the result
  console.log(result)
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `project`                                                                                                                                                                      | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Project name for configuration like `Example Project`                                                                                                                          |
| `env`                                                                                                                                                                          | [operations.Env](../../models/operations/env.md)                                                                                                                               | :heavy_minus_sign:                                                                                                                                                             | Environment - "dev", "staging" or "prod"                                                                                                                                       |
| `name`                                                                                                                                                                         | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | The name of the configuration like `v0`                                                                                                                                        |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[components.Configuration[]](../../models/.md)\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## createConfiguration

Create a new configuration

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  await honeyHive.configurations.createConfiguration({
    project: "660d7ba7995cacccce4d299e",
    name: "function-v0",
    provider: "openai",
    parameters: {
      callType: "chat",
      model: "gpt-4-turbo-preview",
      hyperparameters: {
        "frequency_penalty": 0,
        "max_tokens": 1000,
        "presence_penalty": 0,
        "stop_sequences": [
          "<value>",
        ],
        "temperature": 0,
        "top_k": -1,
        "top_p": 1,
      },
      selectedFunctions: [
        {
          id: "64e3ba90e81f9b3a3808c27f",
          name: "get_google_information",
          description: "Get information from Google when you do not have that information in your context",
          parameters: {
            "type": "object",
            "properties": {
              "query": {
                "type": "string",
                "description": "The query asked by the user",
              },
            },
            "required": [
              "query",
            ],
          },
        },
      ],
      functionCallParams: "auto",
      forceFunction: {
  
      },
      additionalProperties: {
        "template": [
          {
            "role": "system",
            "content": "You are a web search assistant.",
          },
          {
            "role": "user",
            "content": "{{ query }}",
          },
        ],
      },
    },
    env: [
      "staging",
    ],
    userProperties: {
      "user_email": "dhruv@honeyhive.ai",
      "user_id": "google-oauth2|108897808434934946583",
      "user_name": "Dhruv Singh",
      "user_picture": "https://lh3.googleusercontent.com/a/ACg8ocLyQilNtK9RIv4M0p-0FBSbxljBP0p5JabnStku1AQKtFSK=s96-c",
    },
  });
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { configurationsCreateConfiguration } from "honeyhive/funcs/configurationsCreateConfiguration.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await configurationsCreateConfiguration(honeyHive, {
    project: "660d7ba7995cacccce4d299e",
    name: "function-v0",
    provider: "openai",
    parameters: {
      callType: "chat",
      model: "gpt-4-turbo-preview",
      hyperparameters: {
        "frequency_penalty": 0,
        "max_tokens": 1000,
        "presence_penalty": 0,
        "stop_sequences": [
          "<value>",
        ],
        "temperature": 0,
        "top_k": -1,
        "top_p": 1,
      },
      selectedFunctions: [
        {
          id: "64e3ba90e81f9b3a3808c27f",
          name: "get_google_information",
          description: "Get information from Google when you do not have that information in your context",
          parameters: {
            "type": "object",
            "properties": {
              "query": {
                "type": "string",
                "description": "The query asked by the user",
              },
            },
            "required": [
              "query",
            ],
          },
        },
      ],
      functionCallParams: "auto",
      forceFunction: {
  
      },
      additionalProperties: {
        "template": [
          {
            "role": "system",
            "content": "You are a web search assistant.",
          },
          {
            "role": "user",
            "content": "{{ query }}",
          },
        ],
      },
    },
    env: [
      "staging",
    ],
    userProperties: {
      "user_email": "dhruv@honeyhive.ai",
      "user_id": "google-oauth2|108897808434934946583",
      "user_name": "Dhruv Singh",
      "user_picture": "https://lh3.googleusercontent.com/a/ACg8ocLyQilNtK9RIv4M0p-0FBSbxljBP0p5JabnStku1AQKtFSK=s96-c",
    },
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [components.PostConfigurationRequest](../../models/components/postconfigurationrequest.md)                                                                                     | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## updateConfiguration

Update an existing configuration

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  await honeyHive.configurations.updateConfiguration("<id>", {
    project: "New Project",
    name: "function-v0",
    provider: "openai",
    parameters: {
      callType: "chat",
      model: "gpt-4-turbo-preview",
      hyperparameters: {
        "frequency_penalty": 0,
        "max_tokens": 1000,
        "presence_penalty": 0,
        "stop_sequences": [
          "<value>",
        ],
        "temperature": 0,
        "top_k": -1,
        "top_p": 1,
      },
      selectedFunctions: [
        {
          id: "64e3ba90e81f9b3a3808c27f",
          name: "get_google_information",
          description: "Get information from Google when you do not have that information in your context",
          parameters: {
            "type": "object",
            "properties": {
              "query": {
                "type": "string",
                "description": "The query asked by the user",
              },
            },
            "required": [
              "query",
            ],
          },
        },
      ],
      functionCallParams: "auto",
      forceFunction: {
  
      },
      additionalProperties: {
        "template": [
          {
            "role": "system",
            "content": "You are a web search assistant.",
          },
          {
            "role": "user",
            "content": "{{ query }}",
          },
        ],
      },
    },
    env: [
      "staging",
    ],
    type: "LLM",
    userProperties: {
      "user_email": "dhruv@honeyhive.ai",
      "user_id": "google-oauth2|108897808434934946583",
      "user_name": "Dhruv Singh",
      "user_picture": "https://lh3.googleusercontent.com/a/ACg8ocLyQilNtK9RIv4M0p-0FBSbxljBP0p5JabnStku1AQKtFSK=s96-c",
    },
  });
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { configurationsUpdateConfiguration } from "honeyhive/funcs/configurationsUpdateConfiguration.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await configurationsUpdateConfiguration(honeyHive, "<id>", {
    project: "New Project",
    name: "function-v0",
    provider: "openai",
    parameters: {
      callType: "chat",
      model: "gpt-4-turbo-preview",
      hyperparameters: {
        "frequency_penalty": 0,
        "max_tokens": 1000,
        "presence_penalty": 0,
        "stop_sequences": [
          "<value>",
        ],
        "temperature": 0,
        "top_k": -1,
        "top_p": 1,
      },
      selectedFunctions: [
        {
          id: "64e3ba90e81f9b3a3808c27f",
          name: "get_google_information",
          description: "Get information from Google when you do not have that information in your context",
          parameters: {
            "type": "object",
            "properties": {
              "query": {
                "type": "string",
                "description": "The query asked by the user",
              },
            },
            "required": [
              "query",
            ],
          },
        },
      ],
      functionCallParams: "auto",
      forceFunction: {
  
      },
      additionalProperties: {
        "template": [
          {
            "role": "system",
            "content": "You are a web search assistant.",
          },
          {
            "role": "user",
            "content": "{{ query }}",
          },
        ],
      },
    },
    env: [
      "staging",
    ],
    type: "LLM",
    userProperties: {
      "user_email": "dhruv@honeyhive.ai",
      "user_id": "google-oauth2|108897808434934946583",
      "user_name": "Dhruv Singh",
      "user_picture": "https://lh3.googleusercontent.com/a/ACg8ocLyQilNtK9RIv4M0p-0FBSbxljBP0p5JabnStku1AQKtFSK=s96-c",
    },
  });

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    | Example                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Configuration ID like `6638187d505c6812e4043f24`                                                                                                                               |                                                                                                                                                                                |
| `putConfigurationRequest`                                                                                                                                                      | [components.PutConfigurationRequest](../../models/components/putconfigurationrequest.md)                                                                                       | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            | [object Object]                                                                                                                                                                |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |                                                                                                                                                                                |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |                                                                                                                                                                                |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |                                                                                                                                                                                |

### Response

**Promise\<void\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |


## deleteConfiguration

Delete a configuration

### Example Usage

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  await honeyHive.configurations.deleteConfiguration("<id>");
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { configurationsDeleteConfiguration } from "honeyhive/funcs/configurationsDeleteConfiguration.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await configurationsDeleteConfiguration(honeyHive, "<id>");

  if (!res.ok) {
    throw res.error;
  }

  const { value: result } = res;

  
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                                                           | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Configuration ID like `6638187d505c6812e4043f24`                                                                                                                               |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Object    | Status Code     | Content Type    |
| --------------- | --------------- | --------------- |
| errors.SDKError | 4xx-5xx         | */*             |

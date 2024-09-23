# HoneyHive

<!-- Start Summary [summary] -->
## Summary


<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents

* [SDK Installation](#sdk-installation)
* [Requirements](#requirements)
* [SDK Example Usage](#sdk-example-usage)
* [Available Resources and Operations](#available-resources-and-operations)
* [Standalone functions](#standalone-functions)
* [Retries](#retries)
* [Error Handling](#error-handling)
* [Server Selection](#server-selection)
* [Custom HTTP Client](#custom-http-client)
* [Authentication](#authentication)
* [Debugging](#debugging)
<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add https://github.com/honeyhiveai/typescript-sdk
```

### PNPM

```bash
pnpm add https://github.com/honeyhiveai/typescript-sdk
```

### Bun

```bash
bun add https://github.com/honeyhiveai/typescript-sdk
```

### Yarn

```bash
yarn add https://github.com/honeyhiveai/typescript-sdk zod

# Note that Yarn does not install peer dependencies automatically. You will need
# to install zod as shown above.
```
<!-- End SDK Installation [installation] -->

<!-- Start SDK Example Usage [usage] -->
## SDK Example Usage

### Example

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "chat_history": [
          {
            "role": "system",
            "content":
              "Answer the user's question only using provided context.\n"
              + "\n"
              + "Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
        "context": "Hello world",
        "question": "What is in the context?",
      },
      outputs: {
        "content": "Hello world",
        "role": "assistant",
      },
      error: "<value>",
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {},
      feedback: {},
      metadata: {},
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  // Handle the result
  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->

<!-- Start Available Resources and Operations [operations] -->
## Available Resources and Operations

<details open>
<summary>Available methods</summary>

### [configurations](docs/sdks/configurations/README.md)

* [getConfigurations](docs/sdks/configurations/README.md#getconfigurations) - Retrieve a list of configurations
* [createConfiguration](docs/sdks/configurations/README.md#createconfiguration) - Create a new configuration
* [updateConfiguration](docs/sdks/configurations/README.md#updateconfiguration) - Update an existing configuration
* [deleteConfiguration](docs/sdks/configurations/README.md#deleteconfiguration) - Delete a configuration

### [datapoints](docs/sdks/datapoints/README.md)

* [getDatapoints](docs/sdks/datapoints/README.md#getdatapoints) - Retrieve a list of datapoints
* [createDatapoint](docs/sdks/datapoints/README.md#createdatapoint) - Create a new datapoint
* [getDatapoint](docs/sdks/datapoints/README.md#getdatapoint) - Retrieve a specific datapoint
* [updateDatapoint](docs/sdks/datapoints/README.md#updatedatapoint) - Update a specific datapoint
* [deleteDatapoint](docs/sdks/datapoints/README.md#deletedatapoint) - Delete a specific datapoint

### [datasets](docs/sdks/datasets/README.md)

* [getDatasets](docs/sdks/datasets/README.md#getdatasets) - Get datasets
* [createDataset](docs/sdks/datasets/README.md#createdataset) - Create a dataset
* [updateDataset](docs/sdks/datasets/README.md#updatedataset) - Update a dataset
* [deleteDataset](docs/sdks/datasets/README.md#deletedataset) - Delete a dataset
* [addDatapoints](docs/sdks/datasets/README.md#adddatapoints) - Add datapoints to a dataset

### [events](docs/sdks/events/README.md)

* [createEvent](docs/sdks/events/README.md#createevent) - Create a new event
* [updateEvent](docs/sdks/events/README.md#updateevent) - Update an event
* [getEvents](docs/sdks/events/README.md#getevents) - Retrieve events based on filters
* [createModelEvent](docs/sdks/events/README.md#createmodelevent) - Create a new model event
* [createEventBatch](docs/sdks/events/README.md#createeventbatch) - Create a batch of events
* [createModelEventBatch](docs/sdks/events/README.md#createmodeleventbatch) - Create a batch of model events


### [metrics](docs/sdks/metrics/README.md)

* [getMetrics](docs/sdks/metrics/README.md#getmetrics) - Get all metrics
* [createMetric](docs/sdks/metrics/README.md#createmetric) - Create a new metric
* [updateMetric](docs/sdks/metrics/README.md#updatemetric) - Update an existing metric
* [deleteMetric](docs/sdks/metrics/README.md#deletemetric) - Delete a metric

### [projects](docs/sdks/projects/README.md)

* [getProjects](docs/sdks/projects/README.md#getprojects) - Get a list of projects
* [createProject](docs/sdks/projects/README.md#createproject) - Create a new project
* [updateProject](docs/sdks/projects/README.md#updateproject) - Update an existing project
* [deleteProject](docs/sdks/projects/README.md#deleteproject) - Delete a project

### [runs](docs/sdks/runs/README.md)

* [createRun](docs/sdks/runs/README.md#createrun) - Create a new evaluation run
* [getRuns](docs/sdks/runs/README.md#getruns) - Get a list of evaluation runs
* [getRun](docs/sdks/runs/README.md#getrun) - Get details of an evaluation run
* [updateRun](docs/sdks/runs/README.md#updaterun) - Update an evaluation run
* [deleteRun](docs/sdks/runs/README.md#deleterun) - Delete an evaluation run

### [session](docs/sdks/session/README.md)

* [startSession](docs/sdks/session/README.md#startsession) - Start a new session
* [getSession](docs/sdks/session/README.md#getsession) - Retrieve a session

### [tools](docs/sdks/tools/README.md)

* [getTools](docs/sdks/tools/README.md#gettools) - Retrieve a list of tools
* [createTool](docs/sdks/tools/README.md#createtool) - Create a new tool
* [updateTool](docs/sdks/tools/README.md#updatetool) - Update an existing tool
* [deleteTool](docs/sdks/tools/README.md#deletetool) - Delete a tool

</details>
<!-- End Available Resources and Operations [operations] -->

<!-- Start Error Handling [errors] -->
## Error Handling

All SDK methods return a response object or throw an error. If Error objects are specified in your OpenAPI Spec, the SDK will throw the appropriate Error type.

| Error Object                        | Status Code                         | Content Type                        |
| ----------------------------------- | ----------------------------------- | ----------------------------------- |
| errors.CreateEventBatchResponseBody | 500                                 | application/json                    |
| errors.SDKError                     | 4xx-5xx                             | */*                                 |

Validation errors can also occur when either method arguments or data returned from the server do not match the expected format. The `SDKValidationError` that is thrown as a result will capture the raw value that failed validation in an attribute called `rawValue`. Additionally, a `pretty()` method is available on this error that can be used to log a nicely formatted string since validation errors can list many issues and the plain error string may be difficult read when debugging. 


```typescript
import { HoneyHive } from "honeyhive";
import {
  CreateEventBatchResponseBody,
  SDKValidationError,
} from "honeyhive/models/errors";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  let result;
  try {
    result = await honeyHive.events.createEventBatch({
      events: [
        {
          project: "Simple RAG",
          source: "playground",
          eventName: "Model Completion",
          eventType: "model",
          eventId: "7f22137a-6911-4ed3-bc36-110f1dde6b66",
          sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
          parentId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
          childrenIds: [
            "<value>",
          ],
          config: {
            "model": "gpt-3.5-turbo",
            "version": "v0.1",
            "provider": "openai",
            "hyperparameters": {
              "temperature": 0,
              "top_p": 1,
              "max_tokens": 1000,
              "presence_penalty": 0,
              "frequency_penalty": 0,
              "stop": [
                "<value>",
              ],
              "n": 1,
            },
            "template": [
              {
                "role": "system",
                "content":
                  "Answer the user's question only using provided context.\n"
                  + "\n"
                  + "Context: {{ context }}",
              },
              {
                "role": "user",
                "content": "{{question}}",
              },
            ],
            "type": "chat",
          },
          inputs: {
            "context": "Hello world",
            "question": "What is in the context?",
            "chat_history": [
              {
                "role": "system",
                "content":
                  "Answer the user's question only using provided context.\n"
                  + "\n"
                  + "Context: Hello world",
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
          error: "<value>",
          startTime: 1714978764301,
          endTime: 1714978765301,
          duration: 999.8056,
          metadata: {
            "cost": 0.00008,
            "completion_tokens": 23,
            "prompt_tokens": 35,
            "total_tokens": 58,
          },
          feedback: {},
          metrics: {
            "Answer Faithfulness": 5,
            "Answer Faithfulness_explanation":
              "The AI assistant's answer is a concise and accurate description of Ramp's API. It provides a clear explanation of what the API does and how developers can use it to integrate Ramp's financial services into their own applications. The answer is faithful to the provided context.",
            "Number of words": 18,
          },
          userProperties: {
            "user": "google-oauth2|111840237613341303366",
          },
        },
      ],
    });

    // Handle the result
    console.log(result);
  } catch (err) {
    switch (true) {
      case (err instanceof SDKValidationError): {
        // Validation errors can be pretty-printed
        console.error(err.pretty());
        // Raw value may also be inspected
        console.error(err.rawValue);
        return;
      }
      case (err instanceof CreateEventBatchResponseBody): {
        // Handle err.data$: CreateEventBatchResponseBodyData
        console.error(err);
        return;
      }
      default: {
        throw err;
      }
    }
  }
}

run();

```
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Select Server by Index

You can override the default server globally by passing a server index to the `serverIdx` optional parameter when initializing the SDK client instance. The selected server will then be used as the default on the operations that use it. This table lists the indexes associated with the available servers:

| # | Server | Variables |
| - | ------ | --------- |
| 0 | `https://api.honeyhive.ai` | None |

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  serverIdx: 0,
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "chat_history": [
          {
            "role": "system",
            "content":
              "Answer the user's question only using provided context.\n"
              + "\n"
              + "Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
        "context": "Hello world",
        "question": "What is in the context?",
      },
      outputs: {
        "content": "Hello world",
        "role": "assistant",
      },
      error: "<value>",
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {},
      feedback: {},
      metadata: {},
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  // Handle the result
  console.log(result);
}

run();

```


### Override Server URL Per-Client

The default server can also be overridden globally by passing a URL to the `serverURL` optional parameter when initializing the SDK client instance. For example:

```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  serverURL: "https://api.honeyhive.ai",
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "chat_history": [
          {
            "role": "system",
            "content":
              "Answer the user's question only using provided context.\n"
              + "\n"
              + "Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
        "context": "Hello world",
        "question": "What is in the context?",
      },
      outputs: {
        "content": "Hello world",
        "role": "assistant",
      },
      error: "<value>",
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {},
      feedback: {},
      metadata: {},
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  // Handle the result
  console.log(result);
}

run();

```
<!-- End Server Selection [server] -->

<!-- Start Custom HTTP Client [http-client] -->
## Custom HTTP Client

The TypeScript SDK makes API calls using an `HTTPClient` that wraps the native
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This
client is a thin wrapper around `fetch` and provides the ability to attach hooks
around the request lifecycle that can be used to modify the request or handle
errors and response.

The `HTTPClient` constructor takes an optional `fetcher` argument that can be
used to integrate a third-party HTTP client or when writing tests to mock out
the HTTP client and feed in fixtures.

The following example shows how to use the `"beforeRequest"` hook to to add a
custom header and a timeout to requests and how to use the `"requestError"` hook
to log errors:

```typescript
import { HoneyHive } from "honeyhive";
import { HTTPClient } from "honeyhive/lib/http";

const httpClient = new HTTPClient({
  // fetcher takes a function that has the same signature as native `fetch`.
  fetcher: (request) => {
    return fetch(request);
  }
});

httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request, {
    signal: request.signal || AbortSignal.timeout(5000)
  });

  nextRequest.headers.set("x-custom-header", "custom value");

  return nextRequest;
});

httpClient.addHook("requestError", (error, request) => {
  console.group("Request Error");
  console.log("Reason:", `${error}`);
  console.log("Endpoint:", `${request.method} ${request.url}`);
  console.groupEnd();
});

const sdk = new HoneyHive({ httpClient });
```
<!-- End Custom HTTP Client [http-client] -->

<!-- Start Authentication [security] -->
## Authentication

### Per-Client Security Schemes

This SDK supports the following security scheme globally:

| Name         | Type         | Scheme       |
| ------------ | ------------ | ------------ |
| `bearerAuth` | http         | HTTP Bearer  |

To authenticate with the API the `bearerAuth` parameter must be set when initializing the SDK client instance. For example:
```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "chat_history": [
          {
            "role": "system",
            "content":
              "Answer the user's question only using provided context.\n"
              + "\n"
              + "Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
        "context": "Hello world",
        "question": "What is in the context?",
      },
      outputs: {
        "content": "Hello world",
        "role": "assistant",
      },
      error: "<value>",
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {},
      feedback: {},
      metadata: {},
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  // Handle the result
  console.log(result);
}

run();

```
<!-- End Authentication [security] -->

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- Start Standalone functions [standalone-funcs] -->
## Standalone functions

All the methods listed above are available as standalone functions. These
functions are ideal for use in applications running in the browser, serverless
runtimes or other environments where application bundle size is a primary
concern. When using a bundler to build your application, all unused
functionality will be either excluded from the final bundle or tree-shaken away.

To read more about standalone functions, check [FUNCTIONS.md](./FUNCTIONS.md).

<details>

<summary>Available standalone functions</summary>

- [configurationsCreateConfiguration](docs/sdks/configurations/README.md#createconfiguration)
- [configurationsDeleteConfiguration](docs/sdks/configurations/README.md#deleteconfiguration)
- [configurationsGetConfigurations](docs/sdks/configurations/README.md#getconfigurations)
- [configurationsUpdateConfiguration](docs/sdks/configurations/README.md#updateconfiguration)
- [datapointsCreateDatapoint](docs/sdks/datapoints/README.md#createdatapoint)
- [datapointsDeleteDatapoint](docs/sdks/datapoints/README.md#deletedatapoint)
- [datapointsGetDatapoint](docs/sdks/datapoints/README.md#getdatapoint)
- [datapointsGetDatapoints](docs/sdks/datapoints/README.md#getdatapoints)
- [datapointsUpdateDatapoint](docs/sdks/datapoints/README.md#updatedatapoint)
- [datasetsAddDatapoints](docs/sdks/datasets/README.md#adddatapoints)
- [datasetsCreateDataset](docs/sdks/datasets/README.md#createdataset)
- [datasetsDeleteDataset](docs/sdks/datasets/README.md#deletedataset)
- [datasetsGetDatasets](docs/sdks/datasets/README.md#getdatasets)
- [datasetsUpdateDataset](docs/sdks/datasets/README.md#updatedataset)
- [eventsCreateEventBatch](docs/sdks/events/README.md#createeventbatch)
- [eventsCreateEvent](docs/sdks/events/README.md#createevent)
- [eventsCreateModelEventBatch](docs/sdks/events/README.md#createmodeleventbatch)
- [eventsCreateModelEvent](docs/sdks/events/README.md#createmodelevent)
- [eventsGetEvents](docs/sdks/events/README.md#getevents)
- [eventsUpdateEvent](docs/sdks/events/README.md#updateevent)
- [metricsCreateMetric](docs/sdks/metrics/README.md#createmetric)
- [metricsDeleteMetric](docs/sdks/metrics/README.md#deletemetric)
- [metricsGetMetrics](docs/sdks/metrics/README.md#getmetrics)
- [metricsUpdateMetric](docs/sdks/metrics/README.md#updatemetric)
- [projectsCreateProject](docs/sdks/projects/README.md#createproject)
- [projectsDeleteProject](docs/sdks/projects/README.md#deleteproject)
- [projectsGetProjects](docs/sdks/projects/README.md#getprojects)
- [projectsUpdateProject](docs/sdks/projects/README.md#updateproject)
- [runsCreateRun](docs/sdks/runs/README.md#createrun)
- [runsDeleteRun](docs/sdks/runs/README.md#deleterun)
- [runsGetRun](docs/sdks/runs/README.md#getrun)
- [runsGetRuns](docs/sdks/runs/README.md#getruns)
- [runsUpdateRun](docs/sdks/runs/README.md#updaterun)
- [sessionGetSession](docs/sdks/session/README.md#getsession)
- [sessionStartSession](docs/sdks/session/README.md#startsession)
- [toolsCreateTool](docs/sdks/tools/README.md#createtool)
- [toolsDeleteTool](docs/sdks/tools/README.md#deletetool)
- [toolsGetTools](docs/sdks/tools/README.md#gettools)
- [toolsUpdateTool](docs/sdks/tools/README.md#updatetool)


</details>
<!-- End Standalone functions [standalone-funcs] -->

<!-- Start Retries [retries] -->
## Retries

Some of the endpoints in this SDK support retries.  If you use the SDK without any configuration, it will fall back to the default retry strategy provided by the API.  However, the default retry strategy can be overridden on a per-operation basis, or across the entire SDK.

To change the default retry strategy for a single API call, simply provide a retryConfig object to the call:
```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "chat_history": [
          {
            "role": "system",
            "content":
              "Answer the user's question only using provided context.\n"
              + "\n"
              + "Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
        "context": "Hello world",
        "question": "What is in the context?",
      },
      outputs: {
        "content": "Hello world",
        "role": "assistant",
      },
      error: "<value>",
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {},
      feedback: {},
      metadata: {},
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  }, {
    retries: {
      strategy: "backoff",
      backoff: {
        initialInterval: 1,
        maxInterval: 50,
        exponent: 1.1,
        maxElapsedTime: 100,
      },
      retryConnectionErrors: false,
    },
  });

  // Handle the result
  console.log(result);
}

run();

```

If you'd like to override the default retry strategy for all operations that support retries, you can provide a retryConfig at SDK initialization:
```typescript
import { HoneyHive } from "honeyhive";

const honeyHive = new HoneyHive({
  retryConfig: {
    strategy: "backoff",
    backoff: {
      initialInterval: 1,
      maxInterval: 50,
      exponent: 1.1,
      maxElapsedTime: 100,
    },
    retryConnectionErrors: false,
  },
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await honeyHive.session.startSession({
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "chat_history": [
          {
            "role": "system",
            "content":
              "Answer the user's question only using provided context.\n"
              + "\n"
              + "Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
        "context": "Hello world",
        "question": "What is in the context?",
      },
      outputs: {
        "content": "Hello world",
        "role": "assistant",
      },
      error: "<value>",
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {},
      feedback: {},
      metadata: {},
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  // Handle the result
  console.log(result);
}

run();

```
<!-- End Retries [retries] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { HoneyHive } from "honeyhive";

const sdk = new HoneyHive({ debugLogger: console });
```
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Maturity

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning usage
to a specific package version. This way, you can install the same version each time without breaking changes unless you are intentionally
looking for the latest version.

## Contributions

While we value open-source contributions to this SDK, this library is generated programmatically.
Feel free to open a PR or a Github issue as a proof of concept and we'll do our best to include it in a future release!

### SDK Created by [Speakeasy](https://docs.speakeasyapi.dev/docs/using-speakeasy/client-sdks)

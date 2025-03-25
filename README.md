# HoneyHive

<!-- Start Summary [summary] -->
## Summary


<!-- End Summary [summary] -->

<!-- Start Table of Contents [toc] -->
## Table of Contents
<!-- $toc-max-depth=2 -->
* [HoneyHive](#honeyhive)
  * [SDK Installation](#sdk-installation)
  * [SDK Example Usage](#sdk-example-usage)
  * [Available Resources and Operations](#available-resources-and-operations)
  * [Error Handling](#error-handling)
  * [Server Selection](#server-selection)
  * [Custom HTTP Client](#custom-http-client)
  * [Authentication](#authentication)
  * [Requirements](#requirements)
  * [Standalone functions](#standalone-functions)
  * [Retries](#retries)
  * [Debugging](#debugging)
* [Development](#development)
  * [Maturity](#maturity)
  * [Contributions](#contributions)

<!-- End Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add honeyhive
```

### PNPM

```bash
pnpm add honeyhive
```

### Bun

```bash
bun add honeyhive
```

### Yarn

```bash
yarn add honeyhive zod

# Note that Yarn does not install peer dependencies automatically. You will need
# to install zod as shown above.
```



### Model Context Protocol (MCP) Server

This SDK is also an installable MCP server where the various SDK methods are
exposed as tools that can be invoked by AI applications.

> Node.js v20 or greater is required to run the MCP server from npm.

<details>
<summary>Claude installation steps</summary>

Add the following server definition to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "HoneyHive": {
      "command": "npx",
      "args": [
        "-y", "--package", "honeyhive",
        "--",
        "mcp", "start",
        "--bearer-auth", "..."
      ]
    }
  }
}
```

</details>

<details>
<summary>Cursor installation steps</summary>

Create a `.cursor/mcp.json` file in your project root with the following content:

```json
{
  "mcpServers": {
    "HoneyHive": {
      "command": "npx",
      "args": [
        "-y", "--package", "honeyhive",
        "--",
        "mcp", "start",
        "--bearer-auth", "..."
      ]
    }
  }
}
```

</details>

You can also run MCP servers as a standalone binary with no additional dependencies. You must pull these binaries from available Github releases:

```bash
curl -L -o mcp-server \
    https://github.com/{org}/{repo}/releases/download/{tag}/mcp-server-bun-darwin-arm64 && \
chmod +x mcp-server
```

If the repo is a private repo you must add your Github PAT to download a release `-H "Authorization: Bearer {GITHUB_PAT}"`.


```json
{
  "mcpServers": {
    "Todos": {
      "command": "./DOWNLOAD/PATH/mcp-server",
      "args": [
        "start"
      ]
    }
  }
}
```

For a full list of server arguments, run:

```sh
npx -y --package honeyhive -- mcp start --help
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
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
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

### [experiments](docs/sdks/experiments/README.md)

* [createRun](docs/sdks/experiments/README.md#createrun) - Create a new evaluation run
* [getRuns](docs/sdks/experiments/README.md#getruns) - Get a list of evaluation runs
* [getRun](docs/sdks/experiments/README.md#getrun) - Get details of an evaluation run
* [updateRun](docs/sdks/experiments/README.md#updaterun) - Update an evaluation run
* [deleteRun](docs/sdks/experiments/README.md#deleterun) - Delete an evaluation run
* [getExperimentResult](docs/sdks/experiments/README.md#getexperimentresult) - Retrieve experiment result
* [getExperimentComparison](docs/sdks/experiments/README.md#getexperimentcomparison) - Retrieve experiment comparison


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

Some methods specify known errors which can be thrown. All the known errors are enumerated in the `models/errors/errors.ts` module. The known errors for a method are documented under the *Errors* tables in SDK docs. For example, the `createEventBatch` method may throw the following errors:

| Error Type                          | Status Code | Content Type     |
| ----------------------------------- | ----------- | ---------------- |
| errors.CreateEventBatchResponseBody | 500         | application/json |
| errors.SDKError                     | 4XX, 5XX    | \*/\*            |

If the method throws an error and it is not captured by the known errors, it will default to throwing a `SDKError`.

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
          childrenIds: [],
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
              "stop": [],
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
      sessionProperties: {
        sessionName: "Playground Session",
        source: "playground",
        sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
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
        userProperties: {
          "user": "google-oauth2|111840237613341303366",
        },
      },
    });

    // Handle the result
    console.log(result);
  } catch (err) {
    switch (true) {
      // The server response does not match the expected SDK schema
      case (err instanceof SDKValidationError): {
        // Pretty-print will provide a human-readable multi-line error message
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
        // Other errors such as network errors, see HTTPClientErrors for more details
        throw err;
      }
    }
  }
}

run();

```

Validation errors can also occur when either method arguments or data returned from the server do not match the expected format. The `SDKValidationError` that is thrown as a result will capture the raw value that failed validation in an attribute called `rawValue`. Additionally, a `pretty()` method is available on this error that can be used to log a nicely formatted multi-line string since validation errors can list many issues and the plain error string may be difficult read when debugging.

In some rare cases, the SDK can fail to get a response from the server or even make the request due to unexpected circumstances such as network conditions. These types of errors are captured in the `models/errors/httpclienterrors.ts` module:

| HTTP Client Error                                    | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- |
| RequestAbortedError                                  | HTTP request was aborted by the client               |
| RequestTimeoutError                                  | HTTP request timed out due to an AbortSignal signal  |
| ConnectionError                                      | HTTP client was unable to make a request to a server |
| InvalidRequestError                                  | Any input used to create a request is invalid        |
| UnexpectedClientError                                | Unrecognised or unexpected error                     |
<!-- End Error Handling [errors] -->

<!-- Start Server Selection [server] -->
## Server Selection

### Override Server URL Per-Client

The default server can be overridden globally by passing a URL to the `serverURL: string` optional parameter when initializing the SDK client instance. For example:
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
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
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

| Name         | Type | Scheme      |
| ------------ | ---- | ----------- |
| `bearerAuth` | http | HTTP Bearer |

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
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
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

- [`configurationsCreateConfiguration`](docs/sdks/configurations/README.md#createconfiguration) - Create a new configuration
- [`configurationsDeleteConfiguration`](docs/sdks/configurations/README.md#deleteconfiguration) - Delete a configuration
- [`configurationsGetConfigurations`](docs/sdks/configurations/README.md#getconfigurations) - Retrieve a list of configurations
- [`configurationsUpdateConfiguration`](docs/sdks/configurations/README.md#updateconfiguration) - Update an existing configuration
- [`datapointsCreateDatapoint`](docs/sdks/datapoints/README.md#createdatapoint) - Create a new datapoint
- [`datapointsDeleteDatapoint`](docs/sdks/datapoints/README.md#deletedatapoint) - Delete a specific datapoint
- [`datapointsGetDatapoint`](docs/sdks/datapoints/README.md#getdatapoint) - Retrieve a specific datapoint
- [`datapointsGetDatapoints`](docs/sdks/datapoints/README.md#getdatapoints) - Retrieve a list of datapoints
- [`datapointsUpdateDatapoint`](docs/sdks/datapoints/README.md#updatedatapoint) - Update a specific datapoint
- [`datasetsAddDatapoints`](docs/sdks/datasets/README.md#adddatapoints) - Add datapoints to a dataset
- [`datasetsCreateDataset`](docs/sdks/datasets/README.md#createdataset) - Create a dataset
- [`datasetsDeleteDataset`](docs/sdks/datasets/README.md#deletedataset) - Delete a dataset
- [`datasetsGetDatasets`](docs/sdks/datasets/README.md#getdatasets) - Get datasets
- [`datasetsUpdateDataset`](docs/sdks/datasets/README.md#updatedataset) - Update a dataset
- [`eventsCreateEvent`](docs/sdks/events/README.md#createevent) - Create a new event
- [`eventsCreateEventBatch`](docs/sdks/events/README.md#createeventbatch) - Create a batch of events
- [`eventsCreateModelEvent`](docs/sdks/events/README.md#createmodelevent) - Create a new model event
- [`eventsCreateModelEventBatch`](docs/sdks/events/README.md#createmodeleventbatch) - Create a batch of model events
- [`eventsGetEvents`](docs/sdks/events/README.md#getevents) - Retrieve events based on filters
- [`eventsUpdateEvent`](docs/sdks/events/README.md#updateevent) - Update an event
- [`experimentsCreateRun`](docs/sdks/experiments/README.md#createrun) - Create a new evaluation run
- [`experimentsDeleteRun`](docs/sdks/experiments/README.md#deleterun) - Delete an evaluation run
- [`experimentsGetExperimentComparison`](docs/sdks/experiments/README.md#getexperimentcomparison) - Retrieve experiment comparison
- [`experimentsGetExperimentResult`](docs/sdks/experiments/README.md#getexperimentresult) - Retrieve experiment result
- [`experimentsGetRun`](docs/sdks/experiments/README.md#getrun) - Get details of an evaluation run
- [`experimentsGetRuns`](docs/sdks/experiments/README.md#getruns) - Get a list of evaluation runs
- [`experimentsUpdateRun`](docs/sdks/experiments/README.md#updaterun) - Update an evaluation run
- [`metricsCreateMetric`](docs/sdks/metrics/README.md#createmetric) - Create a new metric
- [`metricsDeleteMetric`](docs/sdks/metrics/README.md#deletemetric) - Delete a metric
- [`metricsGetMetrics`](docs/sdks/metrics/README.md#getmetrics) - Get all metrics
- [`metricsUpdateMetric`](docs/sdks/metrics/README.md#updatemetric) - Update an existing metric
- [`projectsCreateProject`](docs/sdks/projects/README.md#createproject) - Create a new project
- [`projectsDeleteProject`](docs/sdks/projects/README.md#deleteproject) - Delete a project
- [`projectsGetProjects`](docs/sdks/projects/README.md#getprojects) - Get a list of projects
- [`projectsUpdateProject`](docs/sdks/projects/README.md#updateproject) - Update an existing project
- [`sessionGetSession`](docs/sdks/session/README.md#getsession) - Retrieve a session
- [`sessionStartSession`](docs/sdks/session/README.md#startsession) - Start a new session
- [`toolsCreateTool`](docs/sdks/tools/README.md#createtool) - Create a new tool
- [`toolsDeleteTool`](docs/sdks/tools/README.md#deletetool) - Delete a tool
- [`toolsGetTools`](docs/sdks/tools/README.md#gettools) - Retrieve a list of tools
- [`toolsUpdateTool`](docs/sdks/tools/README.md#updatetool) - Update an existing tool

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
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
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
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
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

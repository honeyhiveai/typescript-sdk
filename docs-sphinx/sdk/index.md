# SDK Reference

This section contains the API reference documentation for the HoneyHive TypeScript SDK.

## Available Modules

The SDK provides the following main modules:

### Session

The Session module allows you to manage sessions for tracking user interactions.

- `startSession()` - Start a new session
- `endSession()` - End an existing session

### Events

The Events module provides methods for logging events and traces.

- `createEvent()` - Create a new event
- `createModelEvent()` - Create a model-specific event
- `createToolEvent()` - Create a tool-specific event

### Datasets

The Datasets module allows you to manage datasets for evaluation.

- `getDatasets()` - List all datasets
- `createDataset()` - Create a new dataset
- `getDataset()` - Get a specific dataset
- `updateDataset()` - Update a dataset
- `deleteDataset()` - Delete a dataset

### Metrics

The Metrics module provides access to evaluation metrics.

- `getMetrics()` - List all metrics
- `createMetric()` - Create a new metric
- `computeMetric()` - Compute a metric value

### Projects

The Projects module allows you to manage projects.

- `getProjects()` - List all projects
- `createProject()` - Create a new project
- `getProject()` - Get a specific project
- `updateProject()` - Update a project
- `deleteProject()` - Delete a project

## Usage Examples

See the [Getting Started](../getting-started.md) guide for basic usage examples.

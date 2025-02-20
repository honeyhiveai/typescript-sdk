# CreateRunRequest

## Example Usage

```typescript
import { CreateRunRequest } from "honeyhive/models/components";

let value: CreateRunRequest = {
  project: "<value>",
  name: "<value>",
  eventIds: [
    "904a4962-4999-4aa6-be56-ecb1ebf2d291",
  ],
};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `project`                                                                         | *string*                                                                          | :heavy_check_mark:                                                                | The UUID of the project this run is associated with                               |
| `name`                                                                            | *string*                                                                          | :heavy_check_mark:                                                                | The name of the run to be displayed                                               |
| `eventIds`                                                                        | *string*[]                                                                        | :heavy_check_mark:                                                                | The UUIDs of the sessions/events this run is associated with                      |
| `datasetId`                                                                       | *string*                                                                          | :heavy_minus_sign:                                                                | The UUID of the dataset this run is associated with                               |
| `datapointIds`                                                                    | *string*[]                                                                        | :heavy_minus_sign:                                                                | The UUIDs of the datapoints from the original dataset this run is associated with |
| `configuration`                                                                   | Record<string, *any*>                                                             | :heavy_minus_sign:                                                                | The configuration being used for this run                                         |
| `metadata`                                                                        | Record<string, *any*>                                                             | :heavy_minus_sign:                                                                | Additional metadata for the run                                                   |
| `status`                                                                          | [components.Status](../../models/components/status.md)                            | :heavy_minus_sign:                                                                | The status of the run                                                             |
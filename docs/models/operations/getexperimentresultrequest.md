# GetExperimentResultRequest

## Example Usage

```typescript
import { GetExperimentResultRequest } from "honeyhive/models/operations";

let value: GetExperimentResultRequest = {
  runId: "<id>",
  projectId: "<id>",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `runId`                                                                      | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `projectId`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `aggregateFunction`                                                          | [operations.AggregateFunction](../../models/operations/aggregatefunction.md) | :heavy_minus_sign:                                                           | N/A                                                                          |
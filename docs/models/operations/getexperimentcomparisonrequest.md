# GetExperimentComparisonRequest

## Example Usage

```typescript
import { GetExperimentComparisonRequest } from "honeyhive/models/operations";

let value: GetExperimentComparisonRequest = {
  runId1: "<value>",
  runId2: "<value>",
  projectId: "<id>",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `runId1`                                                                                         | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `runId2`                                                                                         | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `projectId`                                                                                      | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `aggregateFunction`                                                                              | [operations.QueryParamAggregateFunction](../../models/operations/queryparamaggregatefunction.md) | :heavy_minus_sign:                                                                               | N/A                                                                                              |
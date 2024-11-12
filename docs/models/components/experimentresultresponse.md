# ExperimentResultResponse

## Example Usage

```typescript
import { ExperimentResultResponse } from "honeyhive/models/components";

let value: ExperimentResultResponse = {};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `status`                                                         | *string*                                                         | :heavy_minus_sign:                                               | N/A                                                              |
| `success`                                                        | *boolean*                                                        | :heavy_minus_sign:                                               | N/A                                                              |
| `passed`                                                         | *string*[]                                                       | :heavy_minus_sign:                                               | N/A                                                              |
| `failed`                                                         | *string*[]                                                       | :heavy_minus_sign:                                               | N/A                                                              |
| `metrics`                                                        | [components.Metrics](../../models/components/metrics.md)         | :heavy_minus_sign:                                               | N/A                                                              |
| `datapoints`                                                     | [components.Datapoints](../../models/components/datapoints.md)[] | :heavy_minus_sign:                                               | N/A                                                              |
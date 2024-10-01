# Metric

## Example Usage

```typescript
import { Metric } from "honeyhive/models/components";

let value: Metric = {
  name: "<value>",
  task: "<value>",
  type: "composite",
  description: "afterwards successfully how gee gadzooks insert",
  returnType: "string",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `name`                                                              | *string*                                                            | :heavy_check_mark:                                                  | Name of the metric                                                  |
| `criteria`                                                          | *string*                                                            | :heavy_minus_sign:                                                  | Criteria for human or composite metrics                             |
| `codeSnippet`                                                       | *string*                                                            | :heavy_minus_sign:                                                  | Associated code block for the metric                                |
| `prompt`                                                            | *string*                                                            | :heavy_minus_sign:                                                  | Evaluator prompt for the metric                                     |
| `task`                                                              | *string*                                                            | :heavy_check_mark:                                                  | Name of the project associated with metric                          |
| `type`                                                              | [components.MetricType](../../models/components/metrictype.md)      | :heavy_check_mark:                                                  | Type of the metric - "custom", "model", "human" or "composite"      |
| `description`                                                       | *string*                                                            | :heavy_check_mark:                                                  | Short description of what the metric does                           |
| `enabledInProd`                                                     | *boolean*                                                           | :heavy_minus_sign:                                                  | Whether to compute on all production events automatically           |
| `needsGroundTruth`                                                  | *boolean*                                                           | :heavy_minus_sign:                                                  | Whether a ground truth (on metadata) is required to compute it      |
| `returnType`                                                        | [components.ReturnTypeT](../../models/components/returntypet.md)    | :heavy_check_mark:                                                  | The data type of the metric value - "boolean", "float", "string"    |
| `threshold`                                                         | [components.Threshold](../../models/components/threshold.md)        | :heavy_minus_sign:                                                  | Threshold for numeric metrics to decide passing or failing in tests |
| `passWhen`                                                          | *boolean*                                                           | :heavy_minus_sign:                                                  | Threshold for boolean metrics to decide passing or failing in tests |
| `id`                                                                | *string*                                                            | :heavy_minus_sign:                                                  | Unique idenitifier                                                  |
| `eventName`                                                         | *string*                                                            | :heavy_minus_sign:                                                  | Name of event that the metric is set to be computed on              |
| `eventType`                                                         | *string*                                                            | :heavy_minus_sign:                                                  | Type of event that the metric is set to be computed on              |
| `childMetrics`                                                      | Record<string, *any*>[]                                             | :heavy_minus_sign:                                                  | Child metrics added under composite events                          |
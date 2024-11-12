# ExperimentComparisonResponseMetrics

## Example Usage

```typescript
import { ExperimentComparisonResponseMetrics } from "honeyhive/models/components";

let value: ExperimentComparisonResponseMetrics = {};
```

## Fields

| Field                    | Type                     | Required                 | Description              |
| ------------------------ | ------------------------ | ------------------------ | ------------------------ |
| `metricName`             | *string*                 | :heavy_minus_sign:       | N/A                      |
| `eventName`              | *string*                 | :heavy_minus_sign:       | N/A                      |
| `metricType`             | *string*                 | :heavy_minus_sign:       | N/A                      |
| `eventType`              | *string*                 | :heavy_minus_sign:       | N/A                      |
| `oldAggregate`           | *number*                 | :heavy_minus_sign:       | N/A                      |
| `newAggregate`           | *number*                 | :heavy_minus_sign:       | N/A                      |
| `foundCount`             | *number*                 | :heavy_minus_sign:       | N/A                      |
| `improvedCount`          | *number*                 | :heavy_minus_sign:       | N/A                      |
| `degradedCount`          | *number*                 | :heavy_minus_sign:       | N/A                      |
| `sameCount`              | *number*                 | :heavy_minus_sign:       | N/A                      |
| `improved`               | *string*[]               | :heavy_minus_sign:       | N/A                      |
| `degraded`               | *string*[]               | :heavy_minus_sign:       | N/A                      |
| `same`                   | *string*[]               | :heavy_minus_sign:       | N/A                      |
| `oldValues`              | *components.OldValues*[] | :heavy_minus_sign:       | N/A                      |
| `newValues`              | *components.NewValues*[] | :heavy_minus_sign:       | N/A                      |
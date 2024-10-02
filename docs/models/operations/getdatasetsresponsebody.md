# GetDatasetsResponseBody

Successful response

## Example Usage

```typescript
import { GetDatasetsResponseBody } from "honeyhive/models/operations";

let value: GetDatasetsResponseBody = {
  testcases: [
    {
      project: "New Project",
      name: "test-dataset",
      description: "A test dataset",
      type: "evaluation",
      datapoints: [
        "66369748b5773befbdc661e2",
      ],
      numPoints: 1,
      linkedEvals: [
        "<value>",
      ],
      saved: false,
      pipelineType: "event",
      createdAt: "2024-05-04T20:15:04.124Z",
      updatedAt: "2024-05-04T20:15:04.124Z",
    },
  ],
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `testcases`                                                | [components.Dataset](../../models/components/dataset.md)[] | :heavy_minus_sign:                                         | N/A                                                        |
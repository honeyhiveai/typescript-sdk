# AddDatapointsRequest

## Example Usage

```typescript
import { AddDatapointsRequest } from "honeyhive/models/operations";

let value: AddDatapointsRequest = {
  datasetId: "<value>",
  requestBody: {
    project: "<value>",
    data: [
      {
        "key": "<value>",
      },
    ],
    mapping: {
      inputs: [
        "<value>",
      ],
      groundTruth: [
        "<value>",
      ],
      history: [
        "<value>",
      ],
    },
  },
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `datasetId`                                                                                | *string*                                                                                   | :heavy_check_mark:                                                                         | The unique identifier of the dataset to add datapoints to like  `663876ec4611c47f4970f0c3` |
| `requestBody`                                                                              | [operations.AddDatapointsRequestBody](../../models/operations/adddatapointsrequestbody.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |
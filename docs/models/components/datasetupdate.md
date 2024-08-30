# DatasetUpdate

## Example Usage

```typescript
import { DatasetUpdate } from "honeyhive/models/components";

let value: DatasetUpdate = {
    datasetId: "663876ec4611c47f4970f0c3",
    name: "new-dataset-name",
    description: "An updated dataset description",
    datapoints: ["66369748b5773befbdc661e"],
    linkedEvals: ["66369748b5773befbdasdk1"],
    metadata: {
        updated: true,
        source: "prod",
    },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `datasetId`                                                                  | *string*                                                                     | :heavy_check_mark:                                                           | The unique identifier of the dataset being updated                           |
| `name`                                                                       | *string*                                                                     | :heavy_minus_sign:                                                           | Updated name for the dataset                                                 |
| `description`                                                                | *string*                                                                     | :heavy_minus_sign:                                                           | Updated description for the dataset                                          |
| `datapoints`                                                                 | *string*[]                                                                   | :heavy_minus_sign:                                                           | Updated list of datapoint ids for the dataset - note the full list is needed |
| `linkedEvals`                                                                | *string*[]                                                                   | :heavy_minus_sign:                                                           | Updated list of unique evaluation run ids to be associated with this dataset |
| `metadata`                                                                   | Record<string, *any*>                                                        | :heavy_minus_sign:                                                           | Updated metadata to track for the dataset                                    |
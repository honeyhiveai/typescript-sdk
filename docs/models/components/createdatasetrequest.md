# CreateDatasetRequest

## Example Usage

```typescript
import { CreateDatasetRequest } from "honeyhive/models/components";

let value: CreateDatasetRequest = {
  project: "New Project",
  name: "test-dataset",
  description: "A test dataset",
  type: "evaluation",
  datapoints: [
    "66369748b5773befbdc661e2",
  ],
  linkedEvals: [],
  saved: false,
  pipelineType: "event",
  metadata: {
    "source": "dev",
  },
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `project`                                                                                                  | *string*                                                                                                   | :heavy_check_mark:                                                                                         | Name of the project associated with this dataset like `New Project`                                        |
| `name`                                                                                                     | *string*                                                                                                   | :heavy_check_mark:                                                                                         | Name of the dataset                                                                                        |
| `description`                                                                                              | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | A description for the dataset                                                                              |
| `type`                                                                                                     | [components.CreateDatasetRequestType](../../models/components/createdatasetrequesttype.md)                 | :heavy_minus_sign:                                                                                         | What the dataset is to be used for - "evaluation" (default) or "fine-tuning"                               |
| `datapoints`                                                                                               | *string*[]                                                                                                 | :heavy_minus_sign:                                                                                         | List of unique datapoint ids to be included in this dataset                                                |
| `linkedEvals`                                                                                              | *string*[]                                                                                                 | :heavy_minus_sign:                                                                                         | List of unique evaluation run ids to be associated with this dataset                                       |
| `saved`                                                                                                    | *boolean*                                                                                                  | :heavy_minus_sign:                                                                                         | N/A                                                                                                        |
| `pipelineType`                                                                                             | [components.CreateDatasetRequestPipelineType](../../models/components/createdatasetrequestpipelinetype.md) | :heavy_minus_sign:                                                                                         | The type of data included in the dataset - "event" (default) or "session"                                  |
| `metadata`                                                                                                 | Record<string, *any*>                                                                                      | :heavy_minus_sign:                                                                                         | Any helpful metadata to track for the dataset                                                              |
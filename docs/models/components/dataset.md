# Dataset

## Example Usage

```typescript
import { Dataset } from "honeyhive/models/components";

let value: Dataset = {
    project: "New Project",
    name: "test-dataset",
    description: "A test dataset",
    type: "evaluation",
    datapoints: ["66369748b5773befbdc661e2"],
    numPoints: 1,
    linkedEvals: ["<value>"],
    saved: false,
    pipelineType: "event",
    createdAt: new Date("2024-05-04T20:15:04.124Z"),
    updatedAt: new Date("2024-05-04T20:15:04.124Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `project`                                                                                     | *string*                                                                                      | :heavy_minus_sign:                                                                            | UUID of the project associated with this dataset                                              |
| `name`                                                                                        | *string*                                                                                      | :heavy_minus_sign:                                                                            | Name of the dataset                                                                           |
| `description`                                                                                 | *string*                                                                                      | :heavy_minus_sign:                                                                            | A description for the dataset                                                                 |
| `type`                                                                                        | [components.DatasetType](../../models/components/datasettype.md)                              | :heavy_minus_sign:                                                                            | What the dataset is to be used for - "evaluation" or "fine-tuning"                            |
| `datapoints`                                                                                  | *string*[]                                                                                    | :heavy_minus_sign:                                                                            | List of unique datapoint ids to be included in this dataset                                   |
| `numPoints`                                                                                   | *number*                                                                                      | :heavy_minus_sign:                                                                            | Number of datapoints included in the dataset                                                  |
| `linkedEvals`                                                                                 | *string*[]                                                                                    | :heavy_minus_sign:                                                                            | N/A                                                                                           |
| `saved`                                                                                       | *boolean*                                                                                     | :heavy_minus_sign:                                                                            | Whether the dataset has been saved or detected                                                |
| `pipelineType`                                                                                | [components.PipelineType](../../models/components/pipelinetype.md)                            | :heavy_minus_sign:                                                                            | The type of data included in the dataset - "event" (default) or "session"                     |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | Timestamp of when the dataset was created                                                     |
| `updatedAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | Timestamp of when the dataset was last updated                                                |
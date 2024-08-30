# GetDatasetsRequest

## Example Usage

```typescript
import { GetDatasetsRequest } from "honeyhive/models/operations";

let value: GetDatasetsRequest = {
    project: "<value>",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `project`                                                                        | *string*                                                                         | :heavy_check_mark:                                                               | Project Name associated with the datasets like `New Project`                     |
| `type`                                                                           | [operations.Type](../../models/operations/type.md)                               | :heavy_minus_sign:                                                               | Type of the dataset - "evaluation" or "fine-tuning"                              |
| `datasetId`                                                                      | *string*                                                                         | :heavy_minus_sign:                                                               | Unique dataset ID for filtering specific dataset like `663876ec4611c47f4970f0c3` |
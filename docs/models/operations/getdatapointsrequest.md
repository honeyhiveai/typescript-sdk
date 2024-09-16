# GetDatapointsRequest

## Example Usage

```typescript
import { GetDatapointsRequest } from "honeyhive/models/operations";

let value: GetDatapointsRequest = {
  project: "<value>",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `project`                                  | *string*                                   | :heavy_check_mark:                         | Project name to filter datapoints          |
| `datapointIds`                             | *string*[]                                 | :heavy_minus_sign:                         | List of datapoint ids to fetch             |
| `datasetName`                              | *string*                                   | :heavy_minus_sign:                         | Name of the dataset to get datapoints from |
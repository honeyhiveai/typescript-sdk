# AddDatapointsRequestBody

## Example Usage

```typescript
import { AddDatapointsRequestBody } from "honeyhive/models/operations";

let value: AddDatapointsRequestBody = {
    project: "<value>",
    data: [
        {
            key: "<value>",
        },
    ],
    mapping: {
        inputs: ["<value>"],
        groundTruth: ["<value>"],
        history: ["<value>"],
    },
};
```

## Fields

| Field                                                                                                                  | Type                                                                                                                   | Required                                                                                                               | Description                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `project`                                                                                                              | *string*                                                                                                               | :heavy_check_mark:                                                                                                     | Name of the project associated with this dataset like `New Project`                                                    |
| `data`                                                                                                                 | Record<string, *any*>[]                                                                                                | :heavy_check_mark:                                                                                                     | List of JSON objects to be added as datapoints                                                                         |
| `mapping`                                                                                                              | [operations.Mapping](../../models/operations/mapping.md)                                                               | :heavy_check_mark:                                                                                                     | Mapping of keys in the data object to be used as inputs, ground truth, and history, everything else goes into metadata |
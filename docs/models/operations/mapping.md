# Mapping

Mapping of keys in the data object to be used as inputs, ground truth, and history, everything else goes into metadata

## Example Usage

```typescript
import { Mapping } from "honeyhive/models/operations";

let value: Mapping = {
    inputs: ["<value>"],
    groundTruth: ["<value>"],
    history: ["<value>"],
};
```

## Fields

| Field                                                                                       | Type                                                                                        | Required                                                                                    | Description                                                                                 |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `inputs`                                                                                    | *string*[]                                                                                  | :heavy_check_mark:                                                                          | List of keys in the data object to be used as inputs                                        |
| `groundTruth`                                                                               | *string*[]                                                                                  | :heavy_check_mark:                                                                          | List of keys in the data object to be used as ground truth                                  |
| `history`                                                                                   | *string*[]                                                                                  | :heavy_check_mark:                                                                          | List of keys in the data object to be used as chat history, can be empty list if not needed |
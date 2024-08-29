# UpdateRunResponse

## Example Usage

```typescript
import { UpdateRunResponse } from "honeyhive/models/components";

let value: UpdateRunResponse = {};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `evaluation`                                                                                       | Record<string, *any*>                                                                              | :heavy_minus_sign:                                                                                 | Database update success message                                                                    |
| `warning`                                                                                          | *string*                                                                                           | :heavy_minus_sign:                                                                                 | A warning message if the logged events don't have an associated datapoint id on the event metadata |
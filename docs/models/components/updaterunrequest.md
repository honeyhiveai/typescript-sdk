# UpdateRunRequest

## Example Usage

```typescript
import { UpdateRunRequest } from "honeyhive/models/components";

let value: UpdateRunRequest = {};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `eventIds`                                                                             | *string*[]                                                                             | :heavy_minus_sign:                                                                     | Additional sessions/events to associate with this run                                  |
| `datasetId`                                                                            | *string*                                                                               | :heavy_minus_sign:                                                                     | The UUID of the dataset this run is associated with                                    |
| `datapointIds`                                                                         | *string*[]                                                                             | :heavy_minus_sign:                                                                     | Additional datapoints to associate with this run                                       |
| `configuration`                                                                        | Record<string, *any*>                                                                  | :heavy_minus_sign:                                                                     | The configuration being used for this run                                              |
| `metadata`                                                                             | Record<string, *any*>                                                                  | :heavy_minus_sign:                                                                     | Additional metadata for the run                                                        |
| `name`                                                                                 | *string*                                                                               | :heavy_minus_sign:                                                                     | The name of the run to be displayed                                                    |
| `status`                                                                               | [components.UpdateRunRequestStatus](../../models/components/updaterunrequeststatus.md) | :heavy_minus_sign:                                                                     | N/A                                                                                    |
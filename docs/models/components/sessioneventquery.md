# SessionEventQuery

The request object for querying session events


## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `eventId`                                             | *string*                                              | :heavy_minus_sign:                                    | The ID of the event                                   |
| `sessionId`                                           | *string*                                              | :heavy_minus_sign:                                    | The ID of the session                                 |
| `eventType`                                           | *string*                                              | :heavy_minus_sign:                                    | The type of the event                                 |
| `project`                                             | *string*                                              | :heavy_minus_sign:                                    | The project that the event belongs to                 |
| `eventName`                                           | *string*                                              | :heavy_minus_sign:                                    | The name for the event                                |
| `config`                                              | Record<string, *any*>                                 | :heavy_minus_sign:                                    | The configuration of LLM, Tool or other for the event |
| `children`                                            | Record<string, *any*>[]                               | :heavy_minus_sign:                                    | Child events                                          |
| `inputs`                                              | Record<string, *any*>                                 | :heavy_minus_sign:                                    | Inputs to the event                                   |
| `outputs`                                             | Record<string, *any*>                                 | :heavy_minus_sign:                                    | Outputs of the event                                  |
| `userProperties`                                      | Record<string, *any*>                                 | :heavy_minus_sign:                                    | User properties of the event                          |
| `error`                                               | *string*                                              | :heavy_minus_sign:                                    | Error from the event                                  |
| `source`                                              | *string*                                              | :heavy_minus_sign:                                    | Source of the event                                   |
| `startTime`                                           | *number*                                              | :heavy_minus_sign:                                    | Start time of the event                               |
| `endTime`                                             | *number*                                              | :heavy_minus_sign:                                    | End time of the event                                 |
| `duration`                                            | *number*                                              | :heavy_minus_sign:                                    | Duration of the event                                 |
| `metadata`                                            | Record<string, *any*>                                 | :heavy_minus_sign:                                    | Metadata of the event                                 |
| `metrics`                                             | Record<string, *any*>                                 | :heavy_minus_sign:                                    | Metrics for the event                                 |
| `feedback`                                            | Record<string, *any*>                                 | :heavy_minus_sign:                                    | Feedback for the event                                |
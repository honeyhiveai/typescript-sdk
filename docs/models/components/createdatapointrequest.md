# CreateDatapointRequest


## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `project`                                                     | *string*                                                      | :heavy_check_mark:                                            | UUID for the project to which the datapoint belongs           |
| `inputs`                                                      | Record<string, *any*>                                         | :heavy_check_mark:                                            | Arbitrary JSON object containing the inputs for the datapoint |
| `history`                                                     | Record<string, *any*>[]                                       | :heavy_minus_sign:                                            | Conversation history associated with the datapoint            |
| `groundTruth`                                                 | Record<string, *any*>                                         | :heavy_minus_sign:                                            | Expected output JSON object for the datapoint                 |
| `linkedEvent`                                                 | *string*                                                      | :heavy_minus_sign:                                            | Event id for the event from which the datapoint was created   |
| `linkedDatasets`                                              | *string*[]                                                    | :heavy_minus_sign:                                            | Ids of all datasets that include the datapoint                |
| `metadata`                                                    | Record<string, *any*>                                         | :heavy_minus_sign:                                            | Any additional metadata for the datapoint                     |
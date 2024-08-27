# UpdateDatapointRequest


## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `inputs`                                                      | Record<string, *any*>                                         | :heavy_minus_sign:                                            | Arbitrary JSON object containing the inputs for the datapoint |
| `history`                                                     | Record<string, *any*>[]                                       | :heavy_minus_sign:                                            | Conversation history associated with the datapoint            |
| `groundTruth`                                                 | Record<string, *any*>                                         | :heavy_minus_sign:                                            | Expected output JSON object for the datapoint                 |
| `linkedEvals`                                                 | *string*[]                                                    | :heavy_minus_sign:                                            | Ids of evaluations where the datapoint is included            |
| `linkedDatasets`                                              | *string*[]                                                    | :heavy_minus_sign:                                            | Ids of all datasets that include the datapoint                |
| `metadata`                                                    | Record<string, *any*>                                         | :heavy_minus_sign:                                            | Any additional metadata for the datapoint                     |
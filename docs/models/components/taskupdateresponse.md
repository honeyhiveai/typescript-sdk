# TaskUpdateResponse


## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `acknowledged`                                                   | *boolean*                                                        | :heavy_minus_sign:                                               | Boolean flag representing if the update operation was successful |
| `modifiedCount`                                                  | *number*                                                         | :heavy_minus_sign:                                               | Number of modified tasks                                         |
| `upsertedId`                                                     | *string*                                                         | :heavy_minus_sign:                                               | The upserted ID of the task, if id has been changed              |
| `upsertedCount`                                                  | *number*                                                         | :heavy_minus_sign:                                               | Number of upserted tasks                                         |
| `matchedCount`                                                   | *number*                                                         | :heavy_minus_sign:                                               | Number of modified tasks                                         |
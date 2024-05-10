# GetDatasetsRequest


## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `project`                                                                        | *string*                                                                         | :heavy_check_mark:                                                               | Project ID associated with the datasets like `65e0fc2d6a2eb95f55a92cbc`          |
| `type`                                                                           | [operations.QueryParamType](../../models/operations/queryparamtype.md)           | :heavy_minus_sign:                                                               | Type of the dataset - "evaluation" or "fine-tuning"                              |
| `datasetId`                                                                      | *string*                                                                         | :heavy_minus_sign:                                                               | Unique dataset ID for filtering specific dataset like `663876ec4611c47f4970f0c3` |
# GetDatapointsRequest


## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `project`                                                              | *string*                                                               | :heavy_check_mark:                                                     | Project ID to filter datapoints                                        |
| `type`                                                                 | [operations.QueryParamType](../../models/operations/queryparamtype.md) | :heavy_minus_sign:                                                     | Type of data - "evaluation" or "event"                                 |
| `datapointIds`                                                         | *string*[]                                                             | :heavy_minus_sign:                                                     | List of datapoint ids to fetch                                         |
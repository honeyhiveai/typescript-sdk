# GetConfigurationsRequest


## Fields

| Field                                                       | Type                                                        | Required                                                    | Description                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `projectName`                                               | *string*                                                    | :heavy_check_mark:                                          | Project name for configuration                              |
| `type`                                                      | [operations.TypeT](../../models/operations/typet.md)        | :heavy_minus_sign:                                          | Configuration type - "LLM" or "pipeline" - default is "LLM" |
| `env`                                                       | [operations.Env](../../models/operations/env.md)            | :heavy_minus_sign:                                          | Environment - "dev", "staging" or "prod"                    |
| `name`                                                      | *string*                                                    | :heavy_minus_sign:                                          | The name of the configuration                               |
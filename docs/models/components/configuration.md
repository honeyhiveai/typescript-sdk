# Configuration


## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `project`                                                              | *string*                                                               | :heavy_check_mark:                                                     | ID of the project to which this configuration belongs                  |
| `type`                                                                 | [components.TypeT](../../models/components/typet.md)                   | :heavy_minus_sign:                                                     | Type of the configuration - "LLM" or "pipeline" - "LLM" by default     |
| `name`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | Name of the configuration                                              |
| `provider`                                                             | *string*                                                               | :heavy_check_mark:                                                     | Name of the provider - "openai", "anthropic", etc.                     |
| `parameters`                                                           | [components.ParametersT](../../models/components/parameterst.md)       | :heavy_minus_sign:                                                     | N/A                                                                    |
| `userProperties`                                                       | [components.UserProperties](../../models/components/userproperties.md) | :heavy_minus_sign:                                                     | Details of user who created the configuration                          |
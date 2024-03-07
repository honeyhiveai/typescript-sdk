# Tool


## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `id`                                                                   | *string*                                                               | :heavy_minus_sign:                                                     | N/A                                                                    |
| `description`                                                          | *string*                                                               | :heavy_minus_sign:                                                     | N/A                                                                    |
| `name`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `parameters`                                                           | [components.ToolParameters](../../models/components/toolparameters.md) | :heavy_check_mark:                                                     | These can be function call params or plugin call params                |
| `task`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | Name of the project associated with this tool                          |
| `type`                                                                 | [components.ToolType](../../models/components/tooltype.md)             | :heavy_check_mark:                                                     | N/A                                                                    |
# Tool

## Example Usage

```typescript
import { Tool } from "honeyhive/models/components";

let value: Tool = {
  task: "<value>",
  name: "<value>",
  parameters: {
    "key": "<value>",
  },
  toolType: "tool",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `id`                                                       | *string*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `task`                                                     | *string*                                                   | :heavy_check_mark:                                         | Name of the project associated with this tool              |
| `name`                                                     | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `description`                                              | *string*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `parameters`                                               | Record<string, *any*>                                      | :heavy_check_mark:                                         | These can be function call params or plugin call params    |
| `toolType`                                                 | [components.ToolType](../../models/components/tooltype.md) | :heavy_check_mark:                                         | N/A                                                        |
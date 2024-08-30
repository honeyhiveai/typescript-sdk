# CreateToolRequest

## Example Usage

```typescript
import { CreateToolRequest } from "honeyhive/models/components";

let value: CreateToolRequest = {
    task: "<value>",
    name: "<value>",
    parameters: {
        key: "<value>",
    },
    type: "function",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `task`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | Name of the project associated with this tool                                        |
| `name`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `description`                                                                        | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `parameters`                                                                         | Record<string, *any*>                                                                | :heavy_check_mark:                                                                   | These can be function call params or plugin call params                              |
| `type`                                                                               | [components.CreateToolRequestType](../../models/components/createtoolrequesttype.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
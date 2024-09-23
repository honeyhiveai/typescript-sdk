# UpdateToolRequest

## Example Usage

```typescript
import { UpdateToolRequest } from "honeyhive/models/components";

let value: UpdateToolRequest = {
  id: "<id>",
  name: "<value>",
  parameters: {
    "key": "<value>",
  },
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `id`                  | *string*              | :heavy_check_mark:    | N/A                   |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `description`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `parameters`          | Record<string, *any*> | :heavy_check_mark:    | N/A                   |
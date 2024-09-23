# EventFilter

## Example Usage

```typescript
import { EventFilter } from "honeyhive/models/components";

let value: EventFilter = {
  field: "event_type",
  value: "model",
  operator: "is",
  type: "string",
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `field`                                                                                            | *string*                                                                                           | :heavy_minus_sign:                                                                                 | The field name that you are filtering by like `metadata.cost`, `inputs.chat_history.0.content`     |
| `value`                                                                                            | *string*                                                                                           | :heavy_minus_sign:                                                                                 | The value that you are filtering the field for                                                     |
| `operator`                                                                                         | [components.Operator](../../models/components/operator.md)                                         | :heavy_minus_sign:                                                                                 | The type of filter you are performing - "is", "is not", "contains", "not contains", "greater than" |
| `type`                                                                                             | [components.Type](../../models/components/type.md)                                                 | :heavy_minus_sign:                                                                                 | The data type you are using - "string", "number", "boolean", "id" (for object ids)                 |
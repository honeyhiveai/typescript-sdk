# SelectedFunctions

## Example Usage

```typescript
import { SelectedFunctions } from "honeyhive/models/components";

let value: SelectedFunctions = {};
```

## Fields

| Field                       | Type                        | Required                    | Description                 |
| --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| `id`                        | *string*                    | :heavy_minus_sign:          | UUID of the function        |
| `name`                      | *string*                    | :heavy_minus_sign:          | Name of the function        |
| `description`               | *string*                    | :heavy_minus_sign:          | Description of the function |
| `parameters`                | Record<string, *any*>       | :heavy_minus_sign:          | Parameters for the function |
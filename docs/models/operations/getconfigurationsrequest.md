# GetConfigurationsRequest

## Example Usage

```typescript
import { GetConfigurationsRequest } from "honeyhive/models/operations";

let value: GetConfigurationsRequest = {
    project: "<value>",
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `project`                                             | *string*                                              | :heavy_check_mark:                                    | Project name for configuration like `Example Project` |
| `env`                                                 | [operations.Env](../../models/operations/env.md)      | :heavy_minus_sign:                                    | Environment - "dev", "staging" or "prod"              |
| `name`                                                | *string*                                              | :heavy_minus_sign:                                    | The name of the configuration like `v0`               |
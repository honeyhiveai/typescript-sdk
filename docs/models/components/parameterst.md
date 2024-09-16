# ParametersT

## Example Usage

```typescript
import { ParametersT } from "honeyhive/models/components";

let value: ParametersT = {
  callType: "chat",
  model: "Impala",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `callType`                                                                           | [components.CallType](../../models/components/calltype.md)                           | :heavy_check_mark:                                                                   | Type of API calling - "chat" or "completion"                                         |
| `model`                                                                              | *string*                                                                             | :heavy_check_mark:                                                                   | Model unique name                                                                    |
| `hyperparameters`                                                                    | Record<string, *any*>                                                                | :heavy_minus_sign:                                                                   | Model-specific hyperparameters                                                       |
| `responseFormat`                                                                     | [components.ResponseFormat](../../models/components/responseformat.md)               | :heavy_minus_sign:                                                                   | Response format for the model with the key "type" and value "text" or "json_object"  |
| `selectedFunctions`                                                                  | [components.SelectedFunctions](../../models/components/selectedfunctions.md)[]       | :heavy_minus_sign:                                                                   | List of functions to be called by the model, refer to OpenAI schema for more details |
| `functionCallParams`                                                                 | [components.FunctionCallParams](../../models/components/functioncallparams.md)       | :heavy_minus_sign:                                                                   | Function calling mode - "none", "auto" or "force"                                    |
| `forceFunction`                                                                      | Record<string, *any*>                                                                | :heavy_minus_sign:                                                                   | Force function-specific parameters                                                   |
| `additionalProperties`                                                               | Record<string, *any*>                                                                | :heavy_minus_sign:                                                                   | N/A                                                                                  |
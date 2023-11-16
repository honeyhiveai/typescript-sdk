# PromptUpdateQuery

The request object for updating a prompt


## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `id`                                        | *string*                                    | :heavy_minus_sign:                          | The ID of the prompt                        |
| `version`                                   | *string*                                    | :heavy_minus_sign:                          | The version of the prompt                   |
| `inputVariables`                            | *string*[]                                  | :heavy_minus_sign:                          | The input variables to feed into the prompt |
| `model`                                     | *string*                                    | :heavy_minus_sign:                          | The model to be used for the prompt         |
| `hyperparameters`                           | Record<string, *any*>                       | :heavy_minus_sign:                          | The hyperparameters for the prompt          |
| `isDeployed`                                | *boolean*                                   | :heavy_minus_sign:                          | Flag indicating if the prompt is deployed   |
| `fewShotExamples`                           | Record<string, *any*>[]                     | :heavy_minus_sign:                          | The few shot examples for the prompt        |
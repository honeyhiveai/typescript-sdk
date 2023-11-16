# PromptCreationQuery

The request object for creating a prompt


## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `task`                                         | *string*                                       | :heavy_minus_sign:                             | The task for which the prompt is being created |
| `version`                                      | *string*                                       | :heavy_minus_sign:                             | The version of the prompt                      |
| `model`                                        | *string*                                       | :heavy_minus_sign:                             | The model to be used for the prompt            |
| `text`                                         | *string*                                       | :heavy_minus_sign:                             | The text of the prompt                         |
| `chat`                                         | *string*                                       | :heavy_minus_sign:                             | The text of the chat prompt                    |
| `hyperparameters`                              | Record<string, *any*>                          | :heavy_minus_sign:                             | The hyperparameters for the prompt             |
| `provider`                                     | *string*                                       | :heavy_minus_sign:                             | The model provider                             |
| `isDeployed`                                   | *boolean*                                      | :heavy_minus_sign:                             | Flag indicating if the prompt is deployed      |
| `fewShotExamples`                              | Record<string, *any*>[]                        | :heavy_minus_sign:                             | The few shot examples for the prompt           |
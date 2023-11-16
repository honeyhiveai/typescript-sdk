# ChatCompletionRequest


## Fields

| Field                    | Type                     | Required                 | Description              |
| ------------------------ | ------------------------ | ------------------------ | ------------------------ |
| `project`                | *string*                 | :heavy_check_mark:       | The project ID           |
| `version`                | *string*                 | :heavy_minus_sign:       | The version of the chat  |
| `messages`               | Record<string, *any*>[]  | :heavy_check_mark:       | The chat history         |
| `model`                  | *string*                 | :heavy_check_mark:       | The model to use         |
| `provider`               | *string*                 | :heavy_minus_sign:       | The provider             |
| `hyperparameters`        | Record<string, *any*>    | :heavy_minus_sign:       | N/A                      |
| `functions`              | Record<string, *any*>[]  | :heavy_minus_sign:       | N/A                      |
| `functionCall`           | *string*                 | :heavy_minus_sign:       | The function call method |
| `numSamples`             | *number*                 | :heavy_minus_sign:       | The number of samples    |
| `stream`                 | *boolean*                | :heavy_minus_sign:       | Whether to stream output |
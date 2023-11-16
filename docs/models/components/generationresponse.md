# GenerationResponse

The response object for a generation


## Fields

| Field                           | Type                            | Required                        | Description                     |
| ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| `generationId`                  | *string*                        | :heavy_minus_sign:              | The unique ID of the generation |
| `version`                       | *string*                        | :heavy_minus_sign:              | The unique ID of the prompt     |
| `generation`                    | *string*                        | :heavy_minus_sign:              | The generated completion        |
| `stream`                        | *boolean*                       | :heavy_minus_sign:              | Is stream output                |
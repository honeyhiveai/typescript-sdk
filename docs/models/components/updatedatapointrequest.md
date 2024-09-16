# UpdateDatapointRequest

## Example Usage

```typescript
import { UpdateDatapointRequest } from "honeyhive/models/components";

let value: UpdateDatapointRequest = {
  inputs: {
    "query": "what's the temperature in Reykjavik?",
  },
  history: [
    {
      "role": "system",
      "content":
        "You are a helpful web assistant that helps users answer questions about the world based on the information provided to you by Google's search API. Answer the questions as truthfully as you can. In case you are unsure about the correct answer, please respond with \"I apologize but I'm not sure.\"",
    },
    {
      "role": "user",
      "content":
        "what's the temperature in Reykjavik?\n\n\n--Google search API results below:---\n\n\"snippet\":\"2 Week Extended Forecast in Reykjavik, Iceland ; Feb 4, 29 / 20 °F · Snow showers early. Broken clouds. ; Feb 5, 27 / 16 °F · Light snow. Decreasing cloudiness.\",\"snippet_highlighted_words\":[\"Feb 4, 29 / 20 °F\"]",
    },
  ],
  groundTruth: {
    "role": "assistant",
    "content":
      "The temperature in Reykjavik, Iceland is currently around 5F or -15C. Please note that weather conditions can change rapidly, so it's best to check a reliable source for the most up-to-date information.",
  },
  linkedEvals: [
    "<value>",
  ],
  linkedDatasets: [
    "<value>",
  ],
  metadata: {
    "question_type": "capital-weather",
    "random_field": 0,
  },
};
```

## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `inputs`                                                      | Record<string, *any*>                                         | :heavy_minus_sign:                                            | Arbitrary JSON object containing the inputs for the datapoint |
| `history`                                                     | Record<string, *any*>[]                                       | :heavy_minus_sign:                                            | Conversation history associated with the datapoint            |
| `groundTruth`                                                 | Record<string, *any*>                                         | :heavy_minus_sign:                                            | Expected output JSON object for the datapoint                 |
| `linkedEvals`                                                 | *string*[]                                                    | :heavy_minus_sign:                                            | Ids of evaluations where the datapoint is included            |
| `linkedDatasets`                                              | *string*[]                                                    | :heavy_minus_sign:                                            | Ids of all datasets that include the datapoint                |
| `metadata`                                                    | Record<string, *any*>                                         | :heavy_minus_sign:                                            | Any additional metadata for the datapoint                     |
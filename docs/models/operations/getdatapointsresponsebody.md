# GetDatapointsResponseBody

Successful response

## Example Usage

```typescript
import { GetDatapointsResponseBody } from "honeyhive/models/operations";

let value: GetDatapointsResponseBody = {
    datapoints: [
        {
            id: "65c13dbbd65fb876b7886cdb",
            tenant: "org_XiCNIMTZzUKiY2As",
            projectId: "653454f3138a956964341c07",
            createdAt: new Date("2024-02-05T19:57:47.05Z"),
            updatedAt: new Date("2024-02-05T19:57:47.05Z"),
            inputs: {
                query: "what's the temperature in Iceland?",
            },
            history: [
                {
                    role: "system",
                    content:
                        "You are a helpful web assistant that helps users answer questions about the world based on the information provided to you by Google's search API. Answer the questions as truthfully as you can. In case you are unsure about the correct answer, please respond with \"I apologize but I'm not sure.\"",
                },
                {
                    role: "user",
                    content:
                        'what\'s the temperature in Iceland?\n\n\n--Google search API results below:---\n\n"snippet":"2 Week Extended Forecast in Reykjavik, Iceland ; Feb 4, 29 / 20 °F · Snow showers early. Broken clouds. ; Feb 5, 27 / 16 °F · Light snow. Decreasing cloudiness.","snippet_highlighted_words":["Feb 4, 29 / 20 °F"]',
                },
            ],
            groundTruth: {
                role: "assistant",
                content:
                    "The temperature in Reykjavik, Iceland is currently around 5F or -15C. Please note that weather conditions can change rapidly, so it's best to check a reliable source for the most up-to-date information.",
            },
            linkedEvent: "6bba5182-d4b1-4b29-a64a-f0a8bd964f76",
            linkedEvals: ["<value>"],
            linkedDatasets: ["<value>"],
            saved: false,
            type: "event",
            metadata: {
                question_type: "weather",
                completion_tokens: 47,
                prompt_tokens: 696,
                total_tokens: 743,
            },
        },
    ],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `datapoints`                                                   | [components.Datapoint](../../models/components/datapoint.md)[] | :heavy_minus_sign:                                             | N/A                                                            |
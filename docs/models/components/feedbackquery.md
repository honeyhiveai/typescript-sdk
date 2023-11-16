# FeedbackQuery

The request object for providing feedback


## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `task`                                                         | *string*                                                       | :heavy_check_mark:                                             | The task for which the feedback is being submitted             |
| `generationId`                                                 | *string*                                                       | :heavy_check_mark:                                             | The ID of the generation for which feedback is being submitted |
| `feedbackJson`                                                 | Record<string, *any*>                                          | :heavy_minus_sign:                                             | The feedback JSON with one or many feedback items              |
| `groundTruth`                                                  | *string*                                                       | :heavy_minus_sign:                                             | The ground truth for the generation                            |
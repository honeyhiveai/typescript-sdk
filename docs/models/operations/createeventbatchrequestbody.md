# CreateEventBatchRequestBody


## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `events`                                                                         | [components.CreateEventRequest](../../models/components/createeventrequest.md)[] | :heavy_check_mark:                                                               | N/A                                                                              |
| `isSingleSession`                                                                | *boolean*                                                                        | :heavy_minus_sign:                                                               | Default is false. If true, all events will be associated with the same session   |
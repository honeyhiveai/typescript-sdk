# GetEventsRequestBody

## Example Usage

```typescript
import { GetEventsRequestBody } from "honeyhive/models/operations";

let value: GetEventsRequestBody = {
  project: "<value>",
  filters: [
    {
      field: "event_type",
      value: "model",
      operator: "is",
      type: "string",
    },
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `project`                                                                | *string*                                                                 | :heavy_check_mark:                                                       | Name of the project associated with the event like `New Project`         |
| `filters`                                                                | [components.EventFilter](../../models/components/eventfilter.md)[]       | :heavy_check_mark:                                                       | N/A                                                                      |
| `dateRange`                                                              | [operations.DateRange](../../models/operations/daterange.md)             | :heavy_minus_sign:                                                       | N/A                                                                      |
| `projections`                                                            | *string*[]                                                               | :heavy_minus_sign:                                                       | Fields to include in the response                                        |
| `limit`                                                                  | *number*                                                                 | :heavy_minus_sign:                                                       | Limit number of results to speed up query (default is 1000, max is 7500) |
| `page`                                                                   | *number*                                                                 | :heavy_minus_sign:                                                       | Page number of results (default is 1)                                    |
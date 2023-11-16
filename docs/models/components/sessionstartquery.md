# SessionStartQuery

The request object for starting a session


## Fields

| Field                               | Type                                | Required                            | Description                         |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `sessionId`                         | *string*                            | :heavy_minus_sign:                  | The ID of the session               |
| `project`                           | *string*                            | :heavy_minus_sign:                  | The project name for the session    |
| `source`                            | *string*                            | :heavy_minus_sign:                  | The source of the session           |
| `sessionName`                       | *string*                            | :heavy_minus_sign:                  | The name for the session            |
| `userProperties`                    | Record<string, *any*>               | :heavy_minus_sign:                  | The user properties for the session |
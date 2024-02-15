<!-- Start SDK Example Usage [usage] -->
```typescript
import { HoneyHive } from "HoneyHive";
import { GetTasksRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const name: string = "<value>";

    const res = await sdk.getTasks(name);

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End SDK Example Usage [usage] -->
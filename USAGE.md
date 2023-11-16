<!-- Start SDK Example Usage -->
```typescript
import { HoneyHive } from "HoneyHive";
import { DeleteTasksRequest } from "HoneyHive/dist/models/operations";

(async () => {
    const sdk = new HoneyHive({
        bearerAuth: "",
    });
    const name: string = "string";

    const res = await sdk.deleteTasks(name);

    if (res.statusCode == 200) {
        // handle response
    }
})();

```
<!-- End SDK Example Usage -->
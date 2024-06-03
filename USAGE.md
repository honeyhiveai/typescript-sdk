<!-- Start SDK Example Usage [usage] -->
```typescript
import { HoneyHive } from "honeyhive";
import { Status } from "honeyhive/dist/models/components";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });

    const res = await sdk.postRuns({
        project: "<value>",
        name: "<value>",
        eventIds: ["7ca92550-e86b-4cb5-8288-452bedab53f3"],
        datapointIds: ["<value>"],
        configuration: {
            key: "<value>",
        },
        metadata: {
            key: "<value>",
        },
    });

    if (res.statusCode == 200) {
        // handle response
    }
}

run();
```
<!-- End SDK Example Usage [usage] -->
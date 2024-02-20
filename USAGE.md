<!-- Start SDK Example Usage [usage] -->
```typescript
import { HoneyHive } from "HoneyHive";
import { GetConfigurationsRequest } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const project: string = "<value>";
    const type: string = "<value>";

    const res = await sdk.configurations.getConfigurations(project, type);

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End SDK Example Usage [usage] -->
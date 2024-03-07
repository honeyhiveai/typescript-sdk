<!-- Start SDK Example Usage [usage] -->
```typescript
import { HoneyHive } from "HoneyHive";
import { GetConfigurationsRequest, TypeT } from "HoneyHive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const projectName: string = "<value>";
    const type: TypeT = TypeT.Llm;

    const res = await sdk.configurations.getConfigurations(projectName, type);

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End SDK Example Usage [usage] -->
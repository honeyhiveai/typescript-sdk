<!-- Start SDK Example Usage [usage] -->
```typescript
import { HoneyHive } from "honeyhive";
import { Env, GetConfigurationsRequest, TypeT } from "honeyhive/dist/models/operations";

async function run() {
    const sdk = new HoneyHive({
        bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
    });
    const projectName: string = "<value>";
    const type: TypeT = TypeT.Llm;
    const env: Env = Env.Prod;
    const name: string = "<value>";

    const res = await sdk.configurations.getConfigurations(projectName, type, env, name);

    if (res.statusCode == 200) {
        // handle response
    }
}

run();

```
<!-- End SDK Example Usage [usage] -->
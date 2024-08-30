# Standalone Functions

> [!NOTE]
> This section is useful if you are using a bundler and targetting browsers and
> runtimes where the size of an application affects performance and load times. 

Every method in this SDK is also available as a standalone function. This
alternative API is suitable when targetting the browser or serverless runtimes
and using a bundler to build your application since all unused functionality
will be tree-shaken away. This includes code for unused methods, Zod schemas,
encoding helpers and response handlers. The result is dramatically smaller
impact on the application's final bundle size which grows very slowly as you use
more and more functionality from this SDK.

Calling methods through the main SDK class remains a valid and generally more
more ergonomic option. Standalone functions represent an optimisation for a
specific category of applications.

## Example

```typescript
import { HoneyHiveCore } from "honeyhive/core.js";
import { sessionStartSession } from "honeyhive/funcs/sessionStartSession.js";
import { SDKValidationError } from "honeyhive/models/errors/sdkvalidationerror.js";

// Use `HoneyHiveCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const honeyHive = new HoneyHiveCore({
  bearerAuth: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const res = await sessionStartSession(honeyHive, {
    session: {
      project: "Simple RAG Project",
      sessionName: "Playground Session",
      source: "playground",
      sessionId: "caf77ace-3417-4da4-944d-f4a0688f3c23",
      childrenIds: [
        "7f22137a-6911-4ed3-bc36-110f1dde6b66",
      ],
      inputs: {
        "context": "Hello world",
        "question": "What is in the context?",
        "chat_history": [
          {
            "role": "system",
            "content": "Answer the user's question only using provided context. Context: Hello world",
          },
          {
            "role": "user",
            "content": "What is in the context?",
          },
        ],
      },
      outputs: {
        "role": "assistant",
        "content": "Hello world",
      },
      error: null,
      duration: 824.8056,
      userProperties: {
        "user": "google-oauth2|111840237613341303366",
      },
      metrics: {
  
      },
      feedback: {
  
      },
      metadata: {
  
      },
      startTime: 1712025501605,
      endTime: 1712025499832,
    },
  });

  switch (true) {
    case res.ok:
      // The success case will be handled outside of the switch block
      break;
    case res.error instanceof SDKValidationError:
      // Pretty-print validation errors.
      return console.log(res.error.pretty());
    case res.error instanceof Error:
      return console.log(res.error);
    default:
      // TypeScript's type checking will fail on the following line if the above
      // cases were not exhaustive.
      res.error satisfies never;
      throw new Error("Assertion failed: expected error checks to be exhaustive: " + res.error);
  }


  const { value: result } = res;

  // Handle the result
  console.log(result)
}

run();
```

## Result types

Standalone functions differ from SDK methods in that they return a
`Result<Value, Error>` type to capture _known errors_ and document them using
the type system. By avoiding throwing errors, application code maintains clear
control flow and error-handling become part of the regular flow of application
code.

> We use the term "known errors" because standalone functions, and JavaScript
> code in general, can still throw unexpected errors such as `TypeError`s,
> `RangeError`s and `DOMException`s. Exhaustively catching all errors may be
> something this SDK addresses in the future. Nevertheless, there is still a lot
> of benefit from capturing most errors and turning them into values.

The second reason for this style of programming is because these functions will
typically be used in front-end applications where exception throwing is
sometimes discouraged or considered unidiomatic. React and similar ecosystems
and libraries tend to promote this style of programming so that components
render useful content under all states (loading, success, error and so on).

The general pattern when calling standalone functions looks like this:

```typescript
import { Core } from "<sdk-package-name>";
import { fetchSomething } from "<sdk-package-name>/funcs/fetchSomething.js";

const client = new Core();

async function run() {
  const result = await fetchSomething(client, { id: "123" });
  if (!result.ok) {
    // You can throw the error or handle it. It's your choice now.
    throw result.error;
  }

  console.log(result.value);
}

run();
```

Notably, `result.error` above will have an explicit type compared to a try-catch
variation where the error in the catch block can only be of type `unknown` (or
`any` depending on your TypeScript settings).
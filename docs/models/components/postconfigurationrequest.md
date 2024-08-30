# PostConfigurationRequest

## Example Usage

```typescript
import { PostConfigurationRequest } from "honeyhive/models/components";

let value: PostConfigurationRequest = {
  project: "660d7ba7995cacccce4d299e",
  name: "function-v0",
  provider: "openai",
  parameters: {
    callType: "chat",
    model: "gpt-4-turbo-preview",
    hyperparameters: {
      "temperature": 0,
      "max_tokens": 1000,
      "top_p": 1,
      "top_k": -1,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "stop_sequences": [
        "<value>",
      ],
    },
    selectedFunctions: [
      {
        id: "64e3ba90e81f9b3a3808c27f",
        name: "get_google_information",
        description: "Get information from Google when you do not have that information in your context",
        parameters: {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "The query asked by the user",
            },
          },
          "required": [
            "query",
          ],
        },
      },
    ],
    functionCallParams: "auto",
    forceFunction: {

    },
    additionalProperties: {
      "template": [
        {
          "role": "system",
          "content": "You are a web search assistant.",
        },
        {
          "role": "user",
          "content": "{{ query }}",
        },
      ],
    },
  },
  env: [
    "staging",
  ],
  userProperties: {
    "user_id": "google-oauth2|108897808434934946583",
    "user_name": "Dhruv Singh",
    "user_picture": "https://lh3.googleusercontent.com/a/ACg8ocLyQilNtK9RIv4M0p-0FBSbxljBP0p5JabnStku1AQKtFSK=s96-c",
    "user_email": "dhruv@honeyhive.ai",
  },
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `project`                                                                                                      | *string*                                                                                                       | :heavy_check_mark:                                                                                             | Name of the project to which this configuration belongs                                                        |
| `name`                                                                                                         | *string*                                                                                                       | :heavy_check_mark:                                                                                             | Name of the configuration                                                                                      |
| `provider`                                                                                                     | *string*                                                                                                       | :heavy_check_mark:                                                                                             | Name of the provider - "openai", "anthropic", etc.                                                             |
| `parameters`                                                                                                   | [components.PostConfigurationRequestParameters](../../models/components/postconfigurationrequestparameters.md) | :heavy_check_mark:                                                                                             | N/A                                                                                                            |
| `env`                                                                                                          | [components.PostConfigurationRequestEnv](../../models/components/postconfigurationrequestenv.md)[]             | :heavy_minus_sign:                                                                                             | List of environments where the configuration is active                                                         |
| `userProperties`                                                                                               | Record<string, *any*>                                                                                          | :heavy_minus_sign:                                                                                             | Details of user who created the configuration                                                                  |
/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { eventsCreateEvent } from "../../funcs/eventsCreateEvent.js";
import * as operations from "../../models/operations/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: operations.CreateEventRequestBody$inboundSchema,
};

export const tool$eventsCreateEvent: ToolDefinition<typeof args> = {
  name: "events-create-event",
  description: `Create a new event

Please refer to our instrumentation guide for detailed information`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await eventsCreateEvent(
      client,
      args.request,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value;

    return formatResult(value, apiCall);
  },
};

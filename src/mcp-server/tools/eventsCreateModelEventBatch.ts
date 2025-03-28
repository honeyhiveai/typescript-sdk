/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { eventsCreateModelEventBatch } from "../../funcs/eventsCreateModelEventBatch.js";
import * as operations from "../../models/operations/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: operations.CreateModelEventBatchRequestBody$inboundSchema,
};

export const tool$eventsCreateModelEventBatch: ToolDefinition<typeof args> = {
  name: "events-create-model-event-batch",
  description: `Create a batch of model events

Please refer to our instrumentation guide for detailed information`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await eventsCreateModelEventBatch(
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

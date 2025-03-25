/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { experimentsCreateRun } from "../../funcs/experimentsCreateRun.js";
import * as components from "../../models/components/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  request: components.CreateRunRequest$inboundSchema,
};

export const tool$experimentsCreateRun: ToolDefinition<typeof args> = {
  name: "experiments-create-run",
  description: `Create a new evaluation run`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await experimentsCreateRun(
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

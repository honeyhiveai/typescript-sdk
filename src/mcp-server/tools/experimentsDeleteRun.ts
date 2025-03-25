/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { experimentsDeleteRun } from "../../funcs/experimentsDeleteRun.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  runId: z.string(),
};

export const tool$experimentsDeleteRun: ToolDefinition<typeof args> = {
  name: "experiments-delete-run",
  description: `Delete an evaluation run`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await experimentsDeleteRun(
      client,
      args.runId,
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

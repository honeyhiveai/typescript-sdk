import { HoneyHive } from "honeyhive";
import { ReActPipeline } from "./tracer_script";
import assert = require("assert");

const HH_API_KEY = process.env.HH_API_KEY;
const HH_DATASET = process.env.HH_DATASET;

describe("TypeScript Tracer", () => {
  it("should successfully trace a session", async () => {
    const userQuestion =
      "What is the effect of climate change on the polar bear population?";
    const tracer = await ReActPipeline(userQuestion, "sdk_ts_test", {});
    const sessionId = tracer.getSessionId();
    assert(typeof sessionId === "string", "Session ID should be a string");

    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
    });

    const res = await sdk.session.getSession(sessionId);
    assert(res.statusCode === 200, "Response status code should be 200");
  });

  it("should successfully trace a session and do an eval", async () => {
    const userQuestion =
      "What is the effect of climate change on the polar bear population?";
    const tracer = await ReActPipeline(userQuestion, "evaluation", {
      dataset_name: HH_DATASET,
    });
    const sessionId = tracer.getSessionId();
    const evalInfo = tracer.getEvalInfo();
    assert(typeof sessionId === "string", "Session ID should be a string");
    expect(evalInfo).not.toBeUndefined();

    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
    });

    const res = await sdk.session.getSession(sessionId);
    assert(res.statusCode === 200, "Response status code should be 200");
  });
});

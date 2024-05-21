const { v4: uuidv4 } = require("uuid");
import { HoneyHive, HoneyHiveTracer } from "honeyhive";
import { ReActPipeline } from "./agent_script";
import { Operator } from "honeyhive/dist/models/components";
import assert from "assert";

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL;
const HH_PROJECT = process.env.HH_PROJECT || "";
const HH_PROJECT_ID = process.env.HH_PROJECT_ID || "";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("TypeScript Tracer", () => {
  it("should successfully trace a session", async () => {
    const sessionName = `HoneyHive TS Tracer Test ${uuidv4()}`;
    await HoneyHiveTracer.init({
      apiKey: HH_API_KEY,
      project: HH_PROJECT,
      sessionName: sessionName,
      source: "HoneyHive TS Tracer Test",
      serverUrl: HH_API_URL,
    });
    const userQuestion =
      "What is the effect of climate change on the polar bear population?";
    await ReActPipeline(userQuestion);

    // Find the session here
    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
      serverURL: HH_API_URL,
    });
    await sleep(15000);
    let res = await sdk.events.getEvents({
      project: HH_PROJECT_ID,
      filters: [
        {
          field: "event_type",
          value: "session",
          operator: Operator.Is,
        },
        {
          field: "event_name",
          value: sessionName,
          operator: Operator.Is,
        },
      ],
    });
    expect(res.statusCode).toEqual(200);
    expect(res.object?.totalEvents).toEqual(1);
    expect(res.object?.events?.length).toEqual(1);

    const events = res.object?.events;
    assert(events, "Expected 'events' to be defined");
    const sessionId = events[0]?.sessionId;
    res = await sdk.events.getEvents({
      project: HH_PROJECT_ID,
      filters: [
        {
          field: "session_id",
          value: sessionId,
          operator: Operator.Is,
        },
      ],
    });
    expect(res.statusCode).toEqual(200);
    expect(res.object?.totalEvents).toBeGreaterThan(1);
  });
});

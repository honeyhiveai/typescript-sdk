import { HoneyHive } from "honeyhive";
import { Operator } from "honeyhive/dist/models/components";
const fs = require("fs");
const path = require("path");
import assert from "assert";

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL;
const HH_PROJECT_ID = process.env.HH_PROJECT_ID || "";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("TypeScript Tracer", () => {
  let sessionName: string;
  beforeAll(function (done) {
    // Read the session name from the file
    const sessionFilePath = path.join(__dirname, "session_name.txt");
    fs.readFile(
      sessionFilePath,
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          return done(err);
        }
        sessionName = data;
        done();
      },
    );
  });

  it("should successfully trace a session and update evaluators on it", async () => {
    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
      serverURL: HH_API_URL,
    });
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

    for (const event of events) {
      expect(event.metrics).toHaveProperty("satisfactorySummaryFound");
    }

    let sessionId = events[0]?.sessionId;
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

import { HoneyHive } from "honeyhive";
const fs = require("fs");
const path = require("path");
import assert from "assert";

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL || "https://api.honeyhive.ai";
const HH_PROJECT_NAME = process.env.HH_PROJECT_NAME || "";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("HoneyHive Tracer Event Field Validation", () => {
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

  it("should verify session event fields", async () => {
    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
      serverURL: HH_API_URL,
    });

    await sleep(10000); // Wait for the script to complete

    const sessionResponse = await sdk.events.getEvents({
      project: HH_PROJECT_NAME,
      filters: [
        {
          field: "event_type",
          value: "session",
          operator: "is",
        },
        {
          field: "event_name",
          value: sessionName,
          operator: "is",
        },
      ],
    });

    expect(sessionResponse.totalEvents).toEqual(5);
    // expect(sessionResponse.events?.length).toEqual(3);

    // print the session response
    console.log(JSON.stringify(sessionResponse, null, 2));

    const sessionEvent = sessionResponse.events?.[0];
    assert(sessionEvent, "Expected a session event to be found");

    // Validate specific fields
    expect(sessionEvent.metadata).toHaveProperty("session_metadata", "meta");
    expect(sessionEvent.metrics).toHaveProperty("metric_1", "sm metric");
    expect(sessionEvent.outputs).toHaveProperty("output_1", "output 1");
    expect(sessionEvent.userProperties).toHaveProperty("user_property_1", "im a neural net");
    expect(sessionEvent.feedback).toHaveProperty("human_mood", "ecstatic");
  });

  it("should verify function trace event fields", async () => {
    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
      serverURL: HH_API_URL,
    });

    const funcResponse = await sdk.events.getEvents({
      project: HH_PROJECT_NAME,
      filters: [
        {
          field: "event_type",
          value: "tool",
          operator: "is",
        },
        {
          field: "session_name",
          value: sessionName,
          operator: "is",
        },
      ],
    });

    expect(funcResponse.totalEvents).toEqual(1);

    funcResponse.events?.forEach((event: any) => {
        expect(event.eventName).toEqual("getRelevantDocuments");
        expect(event.inputs).toHaveProperty("queryVector", "embedding");
        expect(event.outputs).toEqual(["a", "b"]);
    });
  });

  it("should verify OpenAI model event fields", async () => {
    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
      serverURL: HH_API_URL,
    });

    const apiResponse = await sdk.events.getEvents({
      project: HH_PROJECT_NAME,
      filters: [
        {
          field: "event_type",
          value: "model",
          operator: "is",
        },
        {
          field: "session_name",
          value: sessionName,
          operator: "is",
        },
      ],
    });

    expect(apiResponse.totalEvents).toEqual(2);

    apiResponse.events?.forEach((event: any) => {
        expect(event.eventName).toEqual("openai.chat");
        expect(event.outputs.role).toEqual("assistant");
        if (event.inputs.chat_history[0].content.includes("no stream")) {
            expect(event.inputs).toHaveProperty("chat_history", [
            {
                "role": "user",
                "content": "wassup dawg say 'we streamin'"
            }
            ]);
        } else {
            expect(event.inputs).toHaveProperty("chat_history", [
            {
                "role": "user",
                "content": "wassup dawg say 'we streamin'"
            }
            ]);
            expect(event.outputs.finish_reason).toEqual("stop");
        }
    });
  });

  it("should validate chain function trace event fields", async () => {
    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
      serverURL: HH_API_URL,
    });

    const chainResponse = await sdk.events.getEvents({
      project: HH_PROJECT_NAME,
      filters: [
        {
          field: "event_type",
          value: "chain",
          operator: "is",
        },
        {
          field: "session_name",
          value: sessionName,
          operator: "is",
        },
      ],
    });

    expect(chainResponse.totalEvents).toEqual(1);

    // chainResponse.events?.forEach((event: any) => {
    //   expect(event.inputs).toHaveProperty("param1", "test");
    //   expect(event.outputs).toHaveProperty("result");
    // });
  });
});

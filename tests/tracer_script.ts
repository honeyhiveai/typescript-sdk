const { v4: uuidv4 } = require("uuid");
import { HoneyHiveTracer } from "honeyhive";
import { ReActPipeline } from "./agent_script";
const fs = require("fs");
const path = require("path");

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL;
const HH_PROJECT = process.env.HH_PROJECT || "";
const HH_PROJECT_ID = process.env.HH_PROJECT_ID || "";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const sessionFilePath = path.join(__dirname, "session_name.txt");

async function initializeTracer(sessionName: string): Promise<HoneyHiveTracer> {
  const tracer = await HoneyHiveTracer.init({
    apiKey: HH_API_KEY,
    project: HH_PROJECT,
    sessionName: sessionName,
    source: "HoneyHive TS Tracer Test",
    serverUrl: HH_API_URL,
  });

  return tracer;
}

(async () => {
  console.log("Script started");
  const sessionName = `HoneyHive TS Tracer Test ${uuidv4()}`;
  console.log(`Generated session name: ${sessionName}`);

  // Write session name to a file
  fs.writeFileSync(sessionFilePath, sessionName);
  console.log(`Session name written to file: ${sessionFilePath}`);

  const tracer1 = await initializeTracer(sessionName);
  await tracer1.trace(async () => {
    const agentResponse = await ReActPipeline(
      "What is the effect of climate change on the polar bear population?",
    );
    console.log(agentResponse);
  });

  const tracer2 = await initializeTracer(sessionName);
  await tracer2.trace(async () => {
    const agentResponse = await ReActPipeline(
      "How does deforestation impact local ecosystems?",
    );
    console.log(agentResponse);
  });

  await sleep(5000);
})();

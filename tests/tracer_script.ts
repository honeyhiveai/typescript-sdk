const { v4: uuidv4 } = require("uuid");
import { HoneyHiveTracer } from "honeyhive";
import { ReActPipeline } from "./agent_script";
const fs = require("fs");
const path = require("path");

const HH_API_KEY = process.env.HH_API_KEY || "";
const HH_API_URL = process.env.HH_API_URL;
const HH_PROJECT = process.env.HH_PROJECT || "";
const HH_PROJECT_ID = process.env.HH_PROJECT_ID || "";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let sessionName: string = "";
async function initializeTracer() {
  sessionName = `HoneyHive TS Tracer Test ${uuidv4()}`;
  await HoneyHiveTracer.init({
    apiKey: HH_API_KEY,
    project: HH_PROJECT,
    sessionName: sessionName,
    source: "HoneyHive TS Tracer Test",
    serverUrl: HH_API_URL,
  });

  // Write session name to a file
  const sessionFilePath = path.join(__dirname, "session_name.txt");
  fs.writeFileSync(sessionFilePath, sessionName);
}

(async () => {
  await initializeTracer();
  const agentResponse = await ReActPipeline("What is the effect of climate change on the polar bear population?");
  await sleep(5000);
})();

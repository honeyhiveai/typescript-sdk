import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuid } from "uuid";
import { PostHog } from "posthog-node";
import * as process from "process";

export class Telemetry {
  private static instance: Telemetry;
  private static readonly ANON_ID_PATH = `${os.homedir()}/.cache/honeyhive/telemetry_anon_id`;
  private static readonly UNKNOWN_ANON_ID = "UNKNOWN";
  private telemetryEnabled: boolean;
  private posthog: PostHog | undefined;
  private anonId: string | undefined;

  public static getInstance(): Telemetry {
    if (!Telemetry.instance) {
      Telemetry.instance = new Telemetry();
    }
    return Telemetry.instance;
  }

  private constructor() {
    this.telemetryEnabled =
      !process.env['HONEYHIVE_TELEMETRY'] ||
      process.env['HONEYHIVE_TELEMETRY']?.toLowerCase() === "true";
    if (this.telemetryEnabled) {
      this.posthog = new PostHog(
        "phc_yeqaIP07fjwZ5n3w47wPtSz7G58igfczuQ9X3zKhuxa",
        {
          host:'https://us.i.posthog.com'
        }
      );
    }
  }

  private getAnonId(): string {
    if (this.anonId) {
      return this.anonId;
    }
    try {
      if (!fs.existsSync(Telemetry.ANON_ID_PATH)) {
        fs.mkdirSync(path.dirname(Telemetry.ANON_ID_PATH), { recursive: true });
        const anonIdFile = fs.openSync(Telemetry.ANON_ID_PATH, "w");
        this.anonId = uuid();
        fs.writeSync(anonIdFile, this.anonId);
        fs.closeSync(anonIdFile);
      } else {
        const anonIdFile = fs.openSync(Telemetry.ANON_ID_PATH, "r");
        this.anonId = fs.readFileSync(anonIdFile, "utf8");
        fs.closeSync(anonIdFile);
      }
      return this.anonId;
    } catch (e) {
      return Telemetry.UNKNOWN_ANON_ID;
    }
  }

  private getHoneyhiveVersion(): string {
    try {
      const packageJson = require('honeyhive/package.json');
      return packageJson.version;
    } catch (e) {
      return "Not installed";
    }
  }

  private getContext(): Record<string, any> {
    return {
      sdk: "honeyhive",
      sdk_version: this.getHoneyhiveVersion(),
      language: {
        name: "typescript",
        version: process.version,
        runtime: "Node.js",
      },
      runtime: this.getRuntimeInfo(),
      os: {
        name: os.type(),
        release: os.release(),
        version: os.version(),
      },
      chip: {
        architecture: os.arch(),
        processor: os.cpus()[0]?.model || "Unknown",
      },
      user_agent: this.getUserAgent(),
      service_provider_info: this.getServiceProviderInfo(),
      notebook_info: this.getNotebookInfo(),
      execution_info: this.getExecutionInfo(),
    };
  }

  private getRuntimeInfo(): Record<string, string> {
    const runtimeInfo: Record<string, string> = {};

    if (process.env['AWS_LAMBDA_FUNCTION_NAME']) {
      runtimeInfo['environment'] = 'AWS Lambda';
    } else if (process.env['AZURE_FUNCTIONS_ENVIRONMENT']) {
      runtimeInfo['environment'] = 'Azure Functions';
    } else if (process.env['GOOGLE_CLOUD_PROJECT']) {
      runtimeInfo['environment'] = 'Google Cloud Functions';
    } else {
      runtimeInfo['environment'] = 'Unknown';
    }

    // You may want to add detection for server-side frameworks here
    // This might require checking for specific packages in package.json

    return runtimeInfo;
  }

  private getUserAgent(): string {
    return `Node.js/${process.version}`;
  }

  private getServiceProviderInfo(): Record<string, any> {
    // In a real implementation, you might want to use a library like 'axios' to make an HTTP request
    // to ipinfo.io. For this example, we'll return a placeholder.
    return { note: "Service provider info not implemented in TypeScript version" };
  }

  private getNotebookInfo(): Record<string, any> {
    // Detecting notebook environments in Node.js is not as straightforward as in Python
    // You might want to check for specific environment variables or installed packages
    return { in_notebook: false, environment: 'standard_nodejs' };
  }

  private getExecutionInfo(): Record<string, any> {
    return {
      executable: process.execPath,
      argv: process.argv,
      execution_method: this.getExecutionMethod(),
    };
  }

  private getExecutionMethod(): string {
    const execPath = process.argv[0]?.toLowerCase() ?? '';
    if (execPath.includes('node')) {
      return 'nodejs';
    } else if (execPath.includes('npm')) {
      return 'npm';
    } else if (execPath.includes('yarn')) {
      return 'yarn';
    } else if (execPath.includes('ts-node')) {
      return 'ts-node';
    } else {
      return 'unknown';
    }
  }

  public async capture(event: string, properties?: Record<string, any>): Promise<void> {
    if (this.telemetryEnabled && this.posthog) {
      let posthogPayload = {
        distinctId: this.getAnonId(),
        event,
        properties: {
          ...properties,
          ...this.getContext(),
        },
      };
      this.posthog.capture(posthogPayload);
      this.posthog.flush();
      await this.posthog.shutdown();
    }
  }

  public logException(error: Error): void {
    if (this.telemetryEnabled) {
      this.capture("error", { error: error.message, stack: error.stack || "" });
    }
  }
}

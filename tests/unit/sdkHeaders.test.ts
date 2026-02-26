import { describe, it, expect } from "vitest";
import { SDK_HEADERS } from "../../src/lib/config";

// Read expected version directly from package.json
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require("../../package.json") as { version: string };

describe("SDK identification headers", () => {
  it("includes all three hh-sdk-* keys", () => {
    expect(SDK_HEADERS).toHaveProperty("hh-sdk-version");
    expect(SDK_HEADERS).toHaveProperty("hh-sdk-language");
    expect(SDK_HEADERS).toHaveProperty("hh-sdk-package");
  });

  it("hh-sdk-version matches package.json version", () => {
    expect(SDK_HEADERS["hh-sdk-version"]).toBe(pkg.version);
  });

  it("hh-sdk-version is not 'unknown'", () => {
    expect(SDK_HEADERS["hh-sdk-version"]).not.toBe("unknown");
  });

  it("hh-sdk-language is 'typescript'", () => {
    expect(SDK_HEADERS["hh-sdk-language"]).toBe("typescript");
  });

  it("hh-sdk-package is 'honeyhive'", () => {
    expect(SDK_HEADERS["hh-sdk-package"]).toBe("honeyhive");
  });
});

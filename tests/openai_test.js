"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = require("openai");
var honeyhive_1 = require("honeyhive");
var uuid_1 = require("uuid");
var HH_API_KEY = process.env.HH_API_KEY || "";
var HH_API_URL = process.env.HH_API_URL;
var HH_PROJECT_NAME = process.env.HH_PROJECT_NAME || "";
var OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
// log all env variables
console.log("HH_API_KEY:", HH_API_KEY);
console.log("HH_API_URL:", HH_API_URL);
console.log("HH_PROJECT_NAME:", HH_PROJECT_NAME);
console.log("OPENAI_API_KEY:", OPENAI_API_KEY);
var openai = new openai_1.OpenAI({
    apiKey: OPENAI_API_KEY,
});
function initializeTracer(sessionName) {
    return __awaiter(this, void 0, void 0, function () {
        var tracer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, honeyhive_1.HoneyHiveTracer.init({
                        apiKey: HH_API_KEY,
                        project: HH_PROJECT_NAME,
                        sessionName: sessionName,
                        source: "OpenAI Test",
                        serverUrl: HH_API_URL,
                    })];
                case 1:
                    tracer = _a.sent();
                    return [2 /*return*/, tracer];
            }
        });
    });
}
function makeOpenAICall(prompt, tracer) {
    return __awaiter(this, void 0, void 0, function () {
        var completion;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, openai.chat.completions.create({
                        messages: [{ role: "user", content: prompt }],
                        model: "gpt-4o",
                    })];
                case 1:
                    completion = _c.sent();
                    if (!((_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content)) {
                        throw new Error('No response content from OpenAI');
                    }
                    return [2 /*return*/, completion.choices[0].message.content];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var sessionName, tracer, prompt_1, tracedMakeOpenAICall, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log("Starting OpenAI test...");
                sessionName = "OpenAI Test ".concat((0, uuid_1.v4)());
                return [4 /*yield*/, initializeTracer(sessionName)];
            case 1:
                tracer = _a.sent();
                prompt_1 = "Write a haiku about programming";
                console.log("Sending prompt: ".concat(prompt_1));
                tracedMakeOpenAICall = tracer.traceFunction()(makeOpenAICall);
                return [4 /*yield*/, tracedMakeOpenAICall(prompt_1, tracer)];
            case 2:
                response = _a.sent();
                if (!response) {
                    console.error("No response received from OpenAI");
                }
                else {
                    console.log("Response:", response);
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error in main execution:", error_1);
                if (error_1 instanceof Error) {
                    console.error("Error message:", error_1.message);
                    console.error("Error stack:", error_1.stack);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();

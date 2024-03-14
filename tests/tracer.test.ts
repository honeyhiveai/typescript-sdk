import { HoneyHive } from 'honeyhive';
import { ReActPipeline } from './tracer_script';
import assert = require("assert");

const HH_API_KEY = process.env.HH_API_KEY;

describe('HoneyHive Tests', () => {
  it('testTracer should successfully trace a session', async () => {
    const userQuestion = 'What is the effect of climate change on the polar bear population?';
    const sessionId = await ReActPipeline(userQuestion);
    assert(typeof sessionId === 'string', 'Session ID should be a string');

    const sdk = new HoneyHive({
      bearerAuth: HH_API_KEY,
    });

    const res = await sdk.session.getSession(sessionId);
    assert(res.statusCode === 200, 'Response status code should be 200');
  });
});

// CommonJS test for HoneyHive SDK
import { HoneyHive, HoneyHiveTracer } from 'honeyhive';

import { OpenAI } from 'openai';

async function getOpenAICompletion(model: string, prompt: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],  
    max_tokens: 100,
  });
  return completion.choices[0].message.content || '';
}

async function runTest(): Promise<void> {
  console.log('Starting HoneyHive SDK CommonJS test...');

  // Add this code at the beginning of your AI pipeline code
  const tracer = await HoneyHiveTracer.init({
    apiKey: process.env.HH_API_KEY,
    project: process.env.HH_PROJECT_NAME,
    source: process.env.HH_SOURCE,
    sessionName: process.env.HH_SESSION_NAME + '-cjs-test',
    serverUrl: process.env.HH_SERVER_URL
  });
  
  try {
    if (!process.env.HH_API_KEY) {
      throw new Error('HH_API_KEY is not set');
    }
    
    // Test HoneyHive SDK
    // const honeyhive = new HoneyHive({ apiKey: process.env.HH_API_KEY });

    const tracedOpenAI = tracer.traceModel(getOpenAICompletion);

    const result = await tracedOpenAI('gpt-4o', 'Hello, world!');
    
    console.log('HoneyHive SDK CommonJS test completed successfully');
  } catch (error) {
    console.error('Error during HoneyHive SDK test:', error);
    process.exit(1);
  }
}

// Execute the test
runTest().catch((error: Error) => {
  console.error('Unhandled error in test execution:', error);
  process.exit(1);
}); 
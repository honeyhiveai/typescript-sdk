// ESM test for HoneyHive SDK
import { HoneyHive } from 'honeyhive';
import { TestConfig } from './types';

async function runTest(): Promise<void> {
  console.log('Starting HoneyHive SDK ESM test...');
  
  try {
    // Initialize the SDK with typed configuration
    const config: TestConfig = {
      apiKey: process.env.HONEYHIVE_API_KEY || 'test-api-key',
    };
    
    const honeyhive = new HoneyHive(config);
    
    console.log('HoneyHive SDK initialized successfully');
    
    // Log some basic information
    console.log('SDK Configuration:', {
      apiKey: 'REDACTED',
      // Add other relevant configuration details here
    });
    
    console.log('HoneyHive SDK ESM test completed successfully');
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
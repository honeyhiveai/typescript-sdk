// LAMBDA DEPLOYMENT BOOTSTRAP
// This file wraps user code to prepare it for Lambda deployment

// Load environment variables from .env file
import * as dotenv from 'dotenv';

// Load environment variables at startup
dotenv.config();

// Note: main() function will be imported from the user's code during patching

// ============================================================================
// This is where we patch the user's TS code as-is
// User code should export a main function, but we'll transform it into a Lambda handler
// </patch>

// ============================================================================
// LAMBDA HANDLER WRAPPER
// This wraps the user's main function as a Lambda handler
// ============================================================================

/**
 * Lambda handler function that will be exported
 * This is the entry point for AWS Lambda
 */
export const handler = async (event: any): Promise<any> => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  
  try {
    // Call the main function from the user's code
    await main();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello World from HoneyHive Lambda!',
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('Error during Lambda execution:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Error during Lambda execution',
        error: String(error),
        timestamp: new Date().toISOString(),
      }),
    };
  }
}; 
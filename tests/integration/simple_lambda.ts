/**
 * Simple AWS Lambda function example
 * 
 * This Lambda function can be deployed to AWS Lambda without any additional dependencies
 */

/**
 * Main function that handles the Lambda execution 
 * Must be exported with this exact name and signature
 */
export async function main(): Promise<void> {
  try {
    console.log('Lambda function is executing...');
    console.log('Processing request data...');
    console.log('Lambda execution completed successfully');
  } catch (error) {
    console.error('Error in Lambda execution:', error);
    // Re-throw to let the Lambda wrapper handle it
    throw error;
  }
} 
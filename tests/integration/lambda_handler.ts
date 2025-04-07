import * as honeyhive from 'honeyhive';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

// This is the lambda handler function
export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    // Initialize HoneyHive
    await honeyhive.init({
      apiKey: process.env.HH_API_KEY,
      project: process.env.HH_PROJECT,
    });

    // Log the event with HoneyHive
    honeyhive.log({
      name: 'lambda-invocation',
      metadata: {
        event: JSON.stringify(event),
        requestId: context.awsRequestId,
      }
    });

    // Your Lambda logic here
    const responseBody = {
      message: 'Hello from HoneyHive-instrumented Lambda!',
      timestamp: new Date().toISOString(),
      requestId: context.awsRequestId,
    };

    // Send the results to HoneyHive before responding
    await honeyhive.flush();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    console.error('Error:', error);
    
    // Log the error with HoneyHive
    honeyhive.log({
      name: 'lambda-error',
      metadata: {
        error: error.message,
        stack: error.stack,
        requestId: context.awsRequestId,
      }
    });
    
    // Make sure to flush logs before responding with error
    await honeyhive.flush();
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Internal Server Error',
        requestId: context.awsRequestId,
      }),
    };
  }
};

// Define a main function for local testing
export const main = async (): Promise<void> => {
  const mockEvent = {
    httpMethod: 'GET',
    path: '/test',
    headers: {
      'Content-Type': 'application/json',
    },
    queryStringParameters: {
      test: 'value',
    },
    body: null,
  } as unknown as APIGatewayProxyEvent;
  
  const mockContext = {
    awsRequestId: 'test-request-' + Date.now(),
    functionName: 'test-function',
    invokedFunctionArn: 'test-arn',
    getRemainingTimeInMillis: () => 30000,
  } as unknown as Context;
  
  const result = await handler(mockEvent, mockContext);
  console.log('Lambda execution result:', result);
  
  // Ensure all logs are flushed
  await honeyhive.flush();
}; 
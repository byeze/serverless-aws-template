import corsMiddleware from '@/presentation/middlewares/cors.middleware';
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

describe('corsMiddleware', () => {
  const mockEvent = {
    httpMethod: 'GET',
  } as unknown as APIGatewayProxyEvent;

  const mockContext = {} as Context;

  const expectedHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  it('should add CORS headers to the response', async () => {
    const mockResponse = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Success' }),
    } as APIGatewayProxyResult;

    const result = await corsMiddleware(mockEvent, mockContext, mockResponse);

    expect(result).toEqual({
      statusCode: 200,
      headers: {
        ...mockResponse.headers,
        ...expectedHeaders,
      },
      body: JSON.stringify({ message: 'Success' }),
    });
  });

  it('should handle pre-flight OPTIONS request', async () => {
    const optionsEvent = {
      ...mockEvent,
      httpMethod: 'OPTIONS',
    } as APIGatewayProxyEvent;

    const result = await corsMiddleware(optionsEvent, mockContext);

    expect(result).toEqual({
      statusCode: 204,
      headers: expectedHeaders,
      body: '',
    });
  });

  it('should return undefined if no response is provided and method is not OPTIONS', async () => {
    const result = await corsMiddleware(mockEvent, mockContext);

    expect(result).toBeUndefined();
  });
});

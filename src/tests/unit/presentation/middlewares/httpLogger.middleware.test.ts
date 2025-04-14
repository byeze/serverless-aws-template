import type { ExtendedContext } from '@/presentation/middlewares';
import { httpLogger } from '@/presentation/middlewares/httpLogger.middleware';
import logger from '@/utils/logger.utils';
import type { APIGatewayProxyEvent } from 'aws-lambda';

jest.mock('@/utils/logger.utils');

describe('httpLogger Middleware', () => {
  const mockEvent: APIGatewayProxyEvent = {
    body: JSON.stringify({ key: 'value' }),
    headers: {},
    multiValueHeaders: {},
    httpMethod: 'GET',
    isBase64Encoded: false,
    path: '/test-path',
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: '123456789012',
      apiId: 'api-id',
      authorizer: null,
      protocol: 'HTTP/1.1',
      httpMethod: 'GET',
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        caller: null,
        clientCert: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: '127.0.0.1',
        user: null,
        userAgent: 'Custom User Agent String',
        userArn: null,
      },
      path: '/test-path',
      stage: 'test',
      requestId: 'test-request-id',
      requestTimeEpoch: 1234567890,
      resourceId: 'resource-id',
      resourcePath: '/test-path',
    },
    resource: '/test-path',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log the incoming request with correct details', async () => {
    await httpLogger(mockEvent, {} as ExtendedContext);

    expect(logger.info).toHaveBeenCalledWith({
      code: 'incoming.request',
      id: mockEvent.requestContext.requestId,
      method: mockEvent.httpMethod,
      path: mockEvent.path,
      resource: mockEvent.resource,
      body: mockEvent.body,
    });
  });

  it('should handle empty body', async () => {
    const eventWithEmptyBody = { ...mockEvent, body: null };

    await httpLogger(eventWithEmptyBody, {} as ExtendedContext);

    expect(logger.info).toHaveBeenCalledWith({
      code: 'incoming.request',
      id: eventWithEmptyBody.requestContext.requestId,
      method: eventWithEmptyBody.httpMethod,
      path: eventWithEmptyBody.path,
      resource: eventWithEmptyBody.resource,
      body: eventWithEmptyBody.body,
    });
  });

  it('should handle missing requestContext', async () => {
    const eventWithMissingRequestContext = {
      ...mockEvent,
      requestContext: null,
    };

    await expect(
      // @ts-expect-error
      httpLogger(eventWithMissingRequestContext, {}),
    ).rejects.toThrow();
  });

  it('should handle missing requestId', async () => {
    const eventWithMissingRequestId = {
      ...mockEvent,
      requestContext: { ...mockEvent.requestContext, requestId: null },
    };

    // @ts-expect-error
    await httpLogger(eventWithMissingRequestId);

    expect(logger.info).toHaveBeenCalledWith({
      code: 'incoming.request',
      id: eventWithMissingRequestId.requestContext.requestId,
      method: eventWithMissingRequestId.httpMethod,
      path: eventWithMissingRequestId.path,
      resource: eventWithMissingRequestId.resource,
      body: eventWithMissingRequestId.body,
    });
  });
});

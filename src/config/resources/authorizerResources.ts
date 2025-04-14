export default {
  Authorizer: {
    Type: 'AWS::ApiGateway::Authorizer',
    Properties: {
      AuthorizerResultTtlInSeconds: 300,
      AuthorizerUri:
        'arn:aws:apigateway:${aws:region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${aws:region}:089125844537:function:custom_authorizer_${self:custom.environments.${opt:stage}}/invocations',
      Type: 'TOKEN',
      IdentitySource: 'method.request.header.Authorization',
      IdentityValidationExpression: '^Bearer [-0-9a-zA-Z._]*$',
      Name: 'custom_authorizer_${self:custom.authorizer.${opt:stage}}',
      RestApiId: {
        Ref: 'ApiGatewayRestApi',
      },
    },
  },
} as const;

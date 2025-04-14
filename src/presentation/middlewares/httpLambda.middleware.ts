import MiddlewareUtil from '.';
import corsMiddleware from './cors.middleware';
import errorHandler from './errorHandler.middleware';
import { httpLogger } from './httpLogger.middleware';
import jsonBodyTransformer from './jsonBodyTransformer.middleware';
import { jwtMiddleware } from './jwt.middleware';

export const httpLambdaMiddleware = (handler: any) => {
  const middleware = new MiddlewareUtil();
  middleware.useBefore(jwtMiddleware);
  middleware.useBefore(jsonBodyTransformer);
  middleware.useFinally(httpLogger);
  middleware.useFinally(corsMiddleware);
  middleware.useOnError(errorHandler);
  return middleware.handler(handler);
};

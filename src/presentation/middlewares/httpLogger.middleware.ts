import logger, { setAwsRequestId } from "@/utils/logger.utils";
import type { APIGatewayProxyEvent } from "aws-lambda";
import type { MiddlewareHook } from ".";

export const httpLogger: MiddlewareHook = async (
  event: APIGatewayProxyEvent,
) => {
  setAwsRequestId(event.requestContext.requestId);
  logger.info({
    code: "incoming.request",
    id: event.requestContext.requestId,
    method: event.httpMethod,
    path: event.path,
    resource: event.resource,
    body: event.body,
  });
};

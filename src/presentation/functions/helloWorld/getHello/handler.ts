import { HelloWorldService } from "@/application/services/helloWorld.service";
import { httpLambdaMiddleware } from "@/presentation/middlewares/httpLambda.middleware";
import { formatJSONResponse } from "@/utils/apiGateway.utils";
import type { APIGatewayProxyEvent, Handler } from "aws-lambda";

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
  const helloWorldService = new HelloWorldService();
  const helloWorld = await helloWorldService.getHelloWorldMessage();

  return formatJSONResponse({
    body: helloWorld.getMessage(),
  });
};

export const main = httpLambdaMiddleware(handler);

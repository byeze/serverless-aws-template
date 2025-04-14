import { DEFAULT_AUTH, DEFAULT_CORS } from "@/constants/aws.constant";
import type { AWSLambdaConfig } from "@/types/serverless.types";

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "/hello",
        cors: DEFAULT_CORS,
        authorizer: DEFAULT_AUTH,
      },
    },
  ],
} as AWSLambdaConfig;

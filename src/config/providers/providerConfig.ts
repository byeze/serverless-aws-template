import type { AWS } from "@serverless/typescript";
import { getLogsRetentionDays } from "../../utils/serverless.utils";
import { environmentConfig } from "./../environmentConfig";
import iamConfig from "./../permissions/iamConfig";
import { stackTagsConfig } from "./stackTagsConfig";

export const providerConfig: AWS["provider"] = {
  name: "aws",
  runtime: "nodejs20.x",
  stage: '${opt:stage, "develop"}',
  region: '${opt:region, "us-east-1"}' as unknown as "us-east-1",
  logRetentionInDays: getLogsRetentionDays(process.env.NODE_ENV || "develop"),
  apiGateway: {
    metrics: false,
    binaryMediaTypes: ["*/*"],
  },
  logs: {
    restApi: {
      accessLogging: true,
      executionLogging: true,
      level: "INFO",
      fullExecutionData: false,
    },
  },
  environment: environmentConfig,
  stackTags: stackTagsConfig,
  iamRoleStatements: iamConfig,
};

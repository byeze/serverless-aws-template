import type { AWS } from "@serverless/typescript";
import { customConfig } from "./src/config/customConfig";
import { providerConfig } from "./src/config/providers/providerConfig";
import { resources } from "./src/config/resources";
import { functions } from "./src/presentation/functions";

const serverlessConfiguration: AWS = {
  service: "serverless-api",
  frameworkVersion: "3",
  useDotenv: true,
  package: {
    individually: true,
    include: ["config/*.json"],
  },
  provider: providerConfig,
  functions,
  resources,
  custom: customConfig,
  plugins: [
    "serverless-esbuild",
    // "serverless-domain-manager",
    "serverless-prune-plugin",
  ],
};

module.exports = serverlessConfiguration;

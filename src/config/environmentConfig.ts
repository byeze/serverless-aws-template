import { buildResourceName } from "@/utils/serverless.utils";

export const environmentConfig: Record<string, string> = {
  // Tables
  SAMPLE_TABPE_NAME: buildResourceName("sample"),

  // DO NOT DELETE!
  NODE_OPTIONS: "--enable-source-maps",
  NODE_ENV: '${opt:stage, "develop"}',
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
};

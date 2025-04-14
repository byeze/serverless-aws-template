import { environmentConfig } from "@/config/environmentConfig";
import type { AwsLogRetentionInDays } from "@serverless/typescript";
import deployConfig from "./../../deploy-config.json";

export function isEmpty(str: string) {
  return !str || str.length === 0;
}

export const DEVELOPER_STACK = !isEmpty(deployConfig.stackName)
  ? `-${deployConfig.stackName}`
  : "";

/**
 * @description Construye el nombre de un recurso de AWS con el stage y stack del deploy
 * @example
 *  buildResourceName('webhook-subscriptions') // webhook-subscriptions-dev-ezequiel
 * @param baseName nombre base del recurso
 * @param appendRegion si se debe agregar la región al nombre del recurso
 * @returns string con el nombre del recurso y el stage + stack del deploy
 */
export function buildResourceName(baseName: string, appendRegion?: boolean) {
  return `${baseName}-\${self:provider.stage}${DEVELOPER_STACK || ""}${
    (appendRegion && "-${self:provider.region}") || ""
  }`;
}

export function getFromEnvConfig(key: string) {
  return process.env[key] || environmentConfig[key];
}

export function getLogsRetentionDays(stage: string): AwsLogRetentionInDays {
  switch (stage) {
    case "dev":
    default:
      return 7;
    case "stage":
      return 30;
    case "prod":
      return 60;
  }
}

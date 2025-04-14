import type { environmentConfig } from "@/config/environmentConfig";

declare namespace NodeJS {
  interface ProcessEnv {
    [key: keyof typeof environmentConfig]: string | undefined;
    NODE_ENV: "dev" | "prod" | "staging";
    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_SESSION_TOKEN?: string;
    AWS_LAMBDA_FUNCTION_NAME?: string;
    AWS_LAMBDA_FUNCTION_VERSION?: string;
    AWS_LAMBDA_FUNCTION_MEMORY_SIZE?: string;
    AWS_LAMBDA_FUNCTION_TIMEOUT?: string;
    AWS_LAMBDA_FUNCTION_HANDLER?: string;
    AWS_LAMBDA_EVENT_BODY?: string;
    AWS_LAMBDA_EVENT_REQUEST_CONTEXT?: string;
    AWS_LAMBDA_CONTEXT_FUNCTION_NAME?: string;
    AWS_LAMBDA_CONTEXT_FUNCTION_VERSION?: string;
    AWS_LAMBDA_CONTEXT_INVOKED_FUNCTION_ARN?: string;
    AWS_LAMBDA_CONTEXT_MEMORY_LIMIT_IN_MB?: string;
    AWS_LAMBDA_CONTEXT_LOG_GROUP_NAME?: string;
    ENABLE_XRAY: string;
  }
}

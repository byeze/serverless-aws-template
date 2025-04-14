import { createLogger, format, transports } from "winston";
import { Context } from "aws-lambda";

// Custom format to include AWS request ID if available
const awsRequestIdFormat = format((info, opts: any) => {
  if (opts.requestId) {
    info.awsRequestId = opts.requestId;
  }
  return info;
});

// Create the logger
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    awsRequestIdFormat({ requestId: null }),
    format.json(),
  ),
  transports: [new transports.Console()],
});

/**
 * Function to set AWS request ID to the logger metadata.
 */
export const setAwsRequestId = (requestId: string) => {
  if (requestId) {
    logger.defaultMeta = { awsRequestId: requestId };
  }
};

export default logger;

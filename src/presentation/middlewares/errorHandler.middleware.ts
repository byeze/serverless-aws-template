import { formatJSONResponse } from '@/utils/apiGateway.utils';
import HttpErrors from '@/utils/httpErrors.utils';
import logger from '@/utils/logger.utils';
import type { APIGatewayProxyEvent } from 'aws-lambda';
import { ZodError } from 'zod';
import type { ExtendedContext, MiddlewareHook } from '.';

/**
 * Middleware error handler hook
 * Handles errors that occur during the request lifecycle.
 */
const errorHandler: MiddlewareHook = async (
  event: APIGatewayProxyEvent,
  context: ExtendedContext,
) => {
  try {
    // Extract error details from the context if available
    const error = context.error;

    if (!error) {
      return;
    }

    // If the error is an HttpError, format a response accordingly
    if (HttpErrors.isHttpError(error)) {
      return formatJSONResponse({
        body: {
          message: error.message,
          code: error.code,
          meta: error.meta,
          issues: error?.issues,
        },
        statusCode: error.status,
      });
    }

    if (error instanceof ZodError) {
      return formatJSONResponse({
        body: {
          message: 'Bad request, please correct and resend again.',
          code: 'BAD_REQUEST',
          meta: error.issues,
        },
        statusCode: 400,
      });
    }

    // Log unexpected errors and send a generic response
    logger.error({
      message: (error as Error).message || 'Unhandled error',
      stack: (error as Error).stack,
      context,
    });
    return formatJSONResponse({
      body: {
        error: 'InternalServerError',
        message: 'An unexpected error occurred',
      },
      statusCode: 500,
    });
  } catch (loggingError) {
    // Handle any errors that occur while handling the original error
    logger.error({
      message: 'Error handler itself encountered an error',
      error: loggingError,
      originalError: context.error,
    });

    return formatJSONResponse({
      body: {
        error: 'InternalServerError',
        message: 'An unexpected error occurred',
      },
      statusCode: 500,
    });
  }
};

export default errorHandler;

import { ExtendedContext } from "@/presentation/middlewares";
import errorHandler from "@/presentation/middlewares/errorHandler.middleware";
import { formatJSONResponse } from "@/utils/apiGateway.utils";
import HttpErrors from "@/utils/httpErrors.utils";
import logger from "@/utils/logger.utils";
import type { APIGatewayProxyEvent } from "aws-lambda";
import { ZodError } from "zod";

jest.mock("@/utils/apiGateway.utils");
jest.mock("@/utils/logger.utils");

describe("errorHandler", () => {
  const mockEvent = {} as APIGatewayProxyEvent;
  const mockContext = {
    error: null,
  } as ExtendedContext;

  it("should handle HttpErrors", async () => {
    const error = new HttpErrors.BadRequest({
      message: "Bad Request",
      code: "BAD_REQUEST",
    });
    mockContext.error = error;

    await errorHandler(mockEvent, mockContext);

    expect(formatJSONResponse).toHaveBeenCalledWith({
      body: {
        message: error.message,
        code: error.code,
        meta: error.meta,
        issues: error?.issues,
      },
      statusCode: error.status,
    });
  });

  it("should handle ZodError", async () => {
    const error = new ZodError([]);
    mockContext.error = error;

    await errorHandler(mockEvent, mockContext);

    expect(formatJSONResponse).toHaveBeenCalledWith({
      body: {
        message: "Bad request, please correct and resend again.",
        code: "BAD_REQUEST",
        meta: error.issues,
      },
      statusCode: 400,
    });
  });

  it("should handle unexpected errors", async () => {
    const error = new Error("Unexpected error");
    mockContext.error = error;

    await errorHandler(mockEvent, mockContext);

    expect(logger.error).toHaveBeenCalledWith({
      message: error.message,
      stack: error.stack,
      context: mockContext,
    });
    expect(formatJSONResponse).toHaveBeenCalledWith({
      body: {
        error: "InternalServerError",
        message: "An unexpected error occurred",
      },
      statusCode: 500,
    });
  });
});

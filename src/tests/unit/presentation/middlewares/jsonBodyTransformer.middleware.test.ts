import jsonBodyTransformer from "@/presentation/middlewares/jsonBodyTransformer.middleware";
import HttpErrors from "@/utils/httpErrors.utils";
import type { APIGatewayProxyEvent } from "aws-lambda";

describe("jsonBodyTransformer", () => {
  const mockEvent = {
    headers: {
      "content-type": "application/json",
    },
    isBase64Encoded: false,
    body: '{"key":"value"}',
  } as unknown as APIGatewayProxyEvent;

  it("should parse JSON body when content-type is application/json", async () => {
    await jsonBodyTransformer(mockEvent);

    expect(mockEvent.body).toEqual({ key: "value" });
  });

  it("should parse base64 encoded JSON body when content-type is application/json", async () => {
    const base64Event = {
      ...mockEvent,
      isBase64Encoded: true,
      body: Buffer.from('{"key":"value"}').toString("base64"),
    } as unknown as APIGatewayProxyEvent;

    await jsonBodyTransformer(base64Event);

    expect(base64Event.body).toEqual({ key: "value" });
  });

  it("should throw an error for invalid JSON body", async () => {
    const invalidJsonEvent = {
      ...mockEvent,
      body: "invalid-json",
    } as unknown as APIGatewayProxyEvent;

    await expect(jsonBodyTransformer(invalidJsonEvent)).rejects.toThrow(
      new HttpErrors.BadRequest({
        message: "Invalid JSON in request body.",
        code: "INVALID_JSON_BODY",
      }),
    );
  });

  it("should not modify body if content-type is not application/json", async () => {
    const nonJsonEvent = {
      ...mockEvent,
      headers: {
        "content-type": "text/plain",
      },
      body: "plain text body",
    } as unknown as APIGatewayProxyEvent;

    await jsonBodyTransformer(nonJsonEvent);

    expect(nonJsonEvent.body).toBe("plain text body");
  });

  it("should not modify body if body is not present", async () => {
    const noBodyEvent = {
      ...mockEvent,
      body: null,
    } as unknown as APIGatewayProxyEvent;

    await jsonBodyTransformer(noBodyEvent);

    expect(noBodyEvent.body).toBeNull();
  });
});

import { parseJwt } from "@/utils/jwt.utils";
import logger from "@/utils/logger.utils";
import type { APIGatewayProxyEvent } from "aws-lambda";
import type { MiddlewareHook } from ".";

export const jwtMiddleware: MiddlewareHook = async (
  event: APIGatewayProxyEvent,
) => {
  try {
    const authHeader =
      event.headers.Authorization || event.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized" }),
      };
    }

    const token = authHeader.split(" ")[1];
    const decodedJwt = parseJwt(token);

    // Extraer el sub del JWT
    const sub = decodedJwt.sub;
    if (!sub) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid JWT: 'sub' not found" }),
      };
    }

    // Sample code to get user from database
    const users = [
      {
        id: "dce8d21a-2ea5-4137-838a-5a388857b5b5",
        name: "John Doe",
        email: "john@example.com",
      },
      {
        id: "7de96c4b-a5fb-48fe-b014-3ed36ae83e66",
        name: "Jane Doe",
        email: "jane@example.com",
      },
    ];

    const user = users.find((u) => u.id === sub);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    (event as any).user = user;
  } catch (error) {
    logger.error({
      message: "Error in jwtMiddleware",
      code: "ERROR.JWT_MIDDLEWARE",
      error,
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

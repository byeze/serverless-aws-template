import type { Schema } from "zod";

export const formatJSONResponse = ({
  statusCode = 200,
  body,
  schema,
}: {
  body: any;
  schema?: Schema;
  statusCode?: number;
}): { statusCode: number; body: string } => {
  if (schema) schema.parse(body);

  return {
    statusCode,
    body: JSON.stringify(body),
  };
};

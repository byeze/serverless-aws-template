import { Statement } from "cdk-iam-floyd";

const statements = [
  new Statement.Secretsmanager().allow().allActions().onAllResources(),
];

/**
 * Convert iam-floyd statements to standard CDK PolicyStatements
 */
export function toServerlessJson(sst: any[]) {
  return sst.map((s) => {
    const statementJSON = s.toJSON();
    const { Resource }: { Resource: string | string[] } = statementJSON;

    // replace $:: with Fn::GetAtt
    if (Resource) {
      if (typeof Resource === "string" && Resource.startsWith("$::")) {
        statementJSON.Resource = {
          "Fn::GetAtt": [Resource.substring(3), "Arn"],
        };
      } else if (Array.isArray(Resource) || typeof Resource === "object") {
        Resource.forEach((r, i) => {
          if (r.startsWith("$::")) {
            Resource[i] = { "Fn::GetAtt": [r.substring(3), "Arn"] } as any;
          }
        });
      }
    }

    return statementJSON;
  });
}

export default toServerlessJson(statements);

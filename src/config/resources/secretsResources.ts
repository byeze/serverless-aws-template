import { APP_SECRET_ID } from "@/constants/secrets.constant";

export const secretResources = {
  ApplicationSecrets: {
    Type: "AWS::SecretsManager::Secret",
    Properties: {
      Name: APP_SECRET_ID,
      Description: "Secrets for the serverless application",
    },
  },
};

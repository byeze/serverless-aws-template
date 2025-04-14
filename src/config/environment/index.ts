import developConfig from "./dev.config";
import prodConfig from "./prod.config";
import stagingConfig from "./staging.config";

export const getConfig = () => {
  const envs: Record<string, any> = {
    develop: developConfig,
    staging: stagingConfig,
    prodblue: prodConfig,
  };
  return envs[process.env.NODE_ENV as string] || {};
};

export const customConfig = {
  stage: "${opt:stage, self:provider.stage}",
  esbuild: {
    bundle: true,
    minify: true,
    sourcemap: true,
    external: ["aws-sdk"],
  },
};

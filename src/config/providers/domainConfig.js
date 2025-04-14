module.exports = async ({ resolveVariable }) => {
  const stage = await resolveVariable("sls:stage");
  let subdomain;

  switch (stage) {
    case "prod":
      subdomain = "api";
      break;

    case "staging":
      subdomain = "staging.api";
      break;

    default:
      subdomain = "dev.api";
      break;
  }

  console.log(`👉 subdomain: ${subdomain}`);

  return subdomain;
};

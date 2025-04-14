export const DEFAULT_CORS = {
  origin: "*",
  headers: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Credentials",
  ],
  credentials: true,
};

export const DEFAULT_AUTH = {
  type: "CUSTOM",
  authorizerId: {
    Ref: "Authorizer",
  },
};

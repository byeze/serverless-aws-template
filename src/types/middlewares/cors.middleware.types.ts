export interface CorsOptions {
  getOrigin?: (incomingOrigin: string, options: CorsOptions) => string;
  credentials?: boolean | string;
  disableBeforePreflightResponse?: boolean;
  headers?: string;
  methods?: string;
  origin?: string;
  origins?: string[];
  exposeHeaders?: string;
  maxAge?: string;
  requestHeaders?: string;
  requestMethods?: string;
  cacheControl?: string;
  vary?: any;
}

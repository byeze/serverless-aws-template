class HttpError extends Error {
  code: string;
  status: number;
  meta?: any;
  issues?: any;

  constructor(
    message: string,
    code: string,
    status: number,
    meta?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'HttpError';
    this.code = code.toUpperCase();
    this.issues = meta?.issues;
    this.status = status;
    this.meta = meta;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// biome-ignore lint/complexity/noStaticOnlyClass: class must be static
export default class HttpErrors {
  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError || (error as Error).name === 'HttpError';
  }

  static TooEarly = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 425, meta);
    }
  };

  static BadRequest = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 400, meta);
    }
  };

  static Unauthorized = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 401, meta);
    }
  };

  static Forbidden = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 403, meta);
    }
  };

  static NotFound = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 404, meta);
    }
  };

  static MethodNotAllowed = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 405, meta);
    }
  };

  static Conflict = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 409, meta);
    }
  };

  static InternalServerError = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 500, meta);
    }
  };

  static NotImplemented = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 501, meta);
    }
  };

  static BadGateway = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 502, meta);
    }
  };

  static ServiceUnavailable = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 503, meta);
    }
  };

  static PaymentRequired = class extends HttpError {
    constructor({
      message,
      code,
      meta,
    }: {
      message: string;
      code: string;
      meta?: any;
    }) {
      super(message, code, 402, meta);
    }
  };
}

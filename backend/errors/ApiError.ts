export default class ApiError extends Error {
  status: ValidHttpStatusCode;
  details?: unknown;

  constructor(
    status: ValidHttpStatusCode,
    message: string,
    details: unknown = null
  ) {
    super(message);
    this.status = status;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

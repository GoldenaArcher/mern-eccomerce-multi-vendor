import ApiError from "@/errors/ApiError";

class RefreshTokenAuthError extends ApiError {
  constructor(message = "Invalid or expired refresh token") {
    super(401, message);
  }
}

class AuthError extends ApiError {
  constructor(
    status: ValidHttpStatusCode = 401,
    message = "Unauthorized",
    details = null
  ) {
    super(status, message, details);
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Resource not found", details = null) {
    super(404, message, details);
  }
}

class ValidationError extends ApiError {
  constructor(message = "Validation failed", details = null) {
    super(400, message, details);
  }
}

class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error", details = null) {
    super(500, message, details);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request", details = null) {
    super(400, message, details);
  }
}

export {
  ApiError,
  AuthError,
  NotFoundError,
  ValidationError,
  InternalServerError,
  RefreshTokenAuthError,
  BadRequestError,
};

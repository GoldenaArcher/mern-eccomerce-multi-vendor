import { Request, Response, NextFunction } from "express";
import { DatabaseUnavailableError, RefreshTokenAuthError } from "@/errors";
import ApiError from "@/errors/ApiError";
import { isDatabaseUnavailable } from "@/utils/is-database-unavailable";

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled Error:", err);

  let apiErr: ApiError;

  if (err instanceof ApiError) {
    apiErr = err;
  } else if (isDatabaseUnavailable(err)) {
    apiErr = new DatabaseUnavailableError();
  } else {
    apiErr = new ApiError(500, "Something went wrong");
  }

  if (
    apiErr instanceof RefreshTokenAuthError ||
    apiErr.message === "Invalid refresh token"
  ) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  res.status(apiErr.status).json({
    success: false,
    message: apiErr.message,
    details: apiErr.details ?? null,
  });
};

export default errorMiddleware;

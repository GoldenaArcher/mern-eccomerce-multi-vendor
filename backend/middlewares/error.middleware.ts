import { Request, Response, NextFunction } from "express";
import { RefreshTokenAuthError } from "@/errors";
import ApiError from "@/errors/ApiError";

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Unhandled Error:", err);

  let apiErr: ApiError;

  if (!(err instanceof ApiError)) {
    apiErr = new ApiError(500, "Something went wrong");
  } else {
    apiErr = err;
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
    details: apiErr.details || null,
  });
};

export default errorMiddleware;

import { Response, NextFunction, Request } from "express";

import { AuthError, InternalServerError } from "@/errors";
import TokenService from "@/services/token.service";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AuthError(401, "Unauthorized: No token provided"));
    }

    const decoded = TokenService.verifyAccessToken(authHeader.slice(7));

    if (!decoded) {
      return next(
        new AuthError(403, "Unauthorized: Token verification failed")
      );
    }

    req.user = decoded;

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return next(new AuthError(401, "Unauthorized: Token expired"));
    }

    if (err.name === "JsonWebTokenError") {
      return next(new AuthError(401, "Unauthorized: Invalid token"));
    }
    return next(new InternalServerError());
  }
};

export default authMiddleware;

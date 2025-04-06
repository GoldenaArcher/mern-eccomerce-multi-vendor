import { Request, Response, NextFunction } from "express";
import { AuthError } from "@/errors";

const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || user.role !== requiredRole) {
      return next(
        new AuthError(403, `Forbidden: ${requiredRole} access required`)
      );
    }
    next();
  };
};

export default roleMiddleware;

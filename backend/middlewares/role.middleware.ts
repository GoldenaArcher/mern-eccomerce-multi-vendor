import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { AuthError } from "@/errors";

interface UserWithRole extends JwtPayload {
  role: string;
}

const roleMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserWithRole;

    if (!user || user.role !== requiredRole) {
      return next(
        new AuthError(403, `Forbidden: ${requiredRole} access required`)
      );
    }
    next();
  };
};

export default roleMiddleware;

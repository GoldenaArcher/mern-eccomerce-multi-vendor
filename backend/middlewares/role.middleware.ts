import { Request, Response, NextFunction } from "express";
import { AuthError } from "@/errors";

const roleMiddleware = (requiredRoles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user.role) {
      return next(new AuthError(401, "Unauthorized: No user role found"));
    }

    const roles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (!roles.includes(user.role)) {
      return next(
        new AuthError(403, `Forbidden: ${roles.join(" or ")} access required`)
      );
    }

    next();
  };
};

export default roleMiddleware;

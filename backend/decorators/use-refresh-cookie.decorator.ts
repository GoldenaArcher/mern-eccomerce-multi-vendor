import { Request, Response, NextFunction } from "express";

export function UseRefreshCookie() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const result = await originalMethod.call(this, req, res, next);

      if (
        result &&
        typeof result === "object" &&
        "refreshToken" in result &&
        typeof result.refreshToken === "string"
      ) {
        const maxAge =
          typeof result.refreshTokenMaxAge === "number"
            ? result.refreshTokenMaxAge
            : 7 * 24 * 60 * 60 * 1000;

        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge,
        });
      }

      return result;
    };
  };
}

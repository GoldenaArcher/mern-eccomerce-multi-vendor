import { controllerAdapter } from "@/utils/controller-adapter";
import { Request, Response, NextFunction } from "express";

export function BindRoute() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      const boundFn = originalMethod.bind(this);

      return controllerAdapter((req, res, next) => boundFn(req, res, next))(
        req,
        res,
        next
      );
    };
  };
}

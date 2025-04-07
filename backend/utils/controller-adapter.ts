import type { Request, Response, NextFunction, RequestHandler } from "express";

export const controllerAdapter =
  <R extends Request = Request>(
    handler: (req: R, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req as R, res, next)).catch(next);
  };

import { ApiError } from "@/errors";
import ResponseModel, { ResponseModelParams } from "@/models/response.model";
import { NextFunction, Request, Response } from "express";

export function CatchAndSend() {
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
      try {
        const result = await originalMethod.call(this, req, res, next);

        if (res.headersSent) return;

        if (result instanceof ApiError) {
          return next(result);
        }

        if (
          result &&
          typeof result === "object" &&
          ("message" in result || "data" in result || "code" in result)
        ) {
          const { message, data, code }: Partial<ResponseModelParams> = result;
          return new ResponseModel({ code, message, data }).send(res);
        }

        return new ResponseModel({
          message: "OK",
          data: result ?? null,
        }).send(res);
      } catch (err) {
        next(err);
      }
    };
  };
}

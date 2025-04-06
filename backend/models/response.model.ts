import { Response } from "express";

export interface ResponseModelParams {
  code?: ValidHttpStatusCode;
  message?: string;
  data?: any;
}

export interface WithRefreshToken {
  refreshToken: string;
  refreshTokenMaxAge: number;
}

export type ControllerResponse<T = any> = ResponseModelParams & { data?: T };

export type ControllerResponseWithRefresh<T = any> = ControllerResponse<T> &
  WithRefreshToken;

class ResponseModel {
  message: string;
  data: any;
  code: ValidHttpStatusCode;
  success: boolean;

  constructor({ code = 200, message = "", data = null }: ResponseModelParams) {
    this.message = message;
    this.data = data;
    this.code = code;
    this.success = code < 400;
  }

  send(res: Response) {
    res.status(this.code).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

export default ResponseModel;

import { Response } from "express";
import _ from "lodash";

export interface ResponseModelParams {
  code?: ValidHttpStatusCode;
  message?: string;
  data?: any;
  pagination?: any;
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
  pagination: any;
  code: ValidHttpStatusCode;
  success: boolean;

  constructor({
    code = 200,
    message = "",
    data = null,
    pagination = null,
  }: ResponseModelParams) {
    this.message = message;
    this.data = data;
    this.pagination = pagination;
    this.code = code;
    this.success = code < 400;
  }

  static ok(message: string, data: any, pagination?: any) {
    return new ResponseModel({ code: 200, message, data, pagination });
  }

  static created(message: string, data: any) {
    return new ResponseModel({ code: 201, message, data });
  }

  send(res: Response) {
    const response: Record<string, any> = {
      success: this.success,
      message: this.message,
      data: this.data,
    };

    if (!_.isNil(this.pagination)) {
      response.pagination = this.pagination;
    }

    return res.status(this.code).json(response);
  }
}

export default ResponseModel;

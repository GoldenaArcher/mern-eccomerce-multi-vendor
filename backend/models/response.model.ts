import { Response } from "express";

interface ResponseModelParams {
  code?: ValidHttpStatusCode;
  message?: string;
  data?: any;
}

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

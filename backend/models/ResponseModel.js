class ResponseModel {
  constructor({ code = 200, message = "", data = null }) {
    this.message = message;
    this.data = data;
    this.code = code;
    this.success = code < 400;
  }

  send(res) {
    res.status(this.code).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = ResponseModel;

class ResponseModel {
  constructor({ code = 200, success = true, message = "", data = null }) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.code = code;
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

const returnResponse = require("../utils/responseUtil");

const errorMiddleware = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  returnResponse(res, {
    code: err.statusCode || 500,
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = errorMiddleware;

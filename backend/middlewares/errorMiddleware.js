const ApiError = require("../errors/ApiError");

const errorMiddleware = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  if (!(err instanceof ApiError)) {
    err = new ApiError(500, "Something went wrong");
  }

  res.status(err.status).json({
    success: false,
    message: err.message,
    details: err.details || null,
  });
};

module.exports = errorMiddleware;

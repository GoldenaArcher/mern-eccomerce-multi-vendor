const returnResponse = (
  res,
  { code = 200, success = true, message = "", data = null }
) => {
  res.status(code).json({
    success,
    message,
    data,
  });
};

module.exports = returnResponse;

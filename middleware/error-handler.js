// const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message,
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose a different value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.message = `No item found with id: ${err.value}`;
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
  // return res.status(customError.statusCode).json({ err });
};

module.exports = errorHandlerMiddleware;

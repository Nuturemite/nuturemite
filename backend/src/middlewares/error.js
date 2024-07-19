import { Errorhandler } from "../utils/errorHandler.js";

export const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resourse not found. Invalid ${err.path}`;
    err = new Errorhandler(message, 400);
  }
  // Duplicate key error

  if (err.code === 11000) {
    const value = Object.keys(err.keyValue);
    const message = `Duplicate value for ${value}`;
    err = new Errorhandler(message, 400);
  }

  // Wrong jwt Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again!`;
    err = new Errorhandler(message, 400);
  }

  // JWT expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired, try again!`;
    err = new Errorhandler(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

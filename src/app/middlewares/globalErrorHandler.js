import AppError from "../errorHelpers/AppError.js";
import { envVars } from "../config/env.js";

export const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = `Something Went Wrong ${error.message}`;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};

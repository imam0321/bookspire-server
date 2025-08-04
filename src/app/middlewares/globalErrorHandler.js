import AppError from "../errorHelpers/AppError.js";
import { envVars } from "../config/env.js";
import { handlerValidationError } from "../helpers/handlerValidationError.js";
import { handlerDuplicateError } from "../helpers/handlerDuplicateError.js";
import { handleCastError } from "../helpers/handleCastError.js";

export const globalErrorHandler = (error, req, res, next) => {
  if (envVars.NODE_ENV === "development") {
    console.log(error);
  }

  let statusCode = 500;
  let errorSources = [];
  let message = `Something Went Wrong ${error.message}`;

  // Mongoose Duplicate Error
  if (error.code === 1100) {
    const simplifiedError = handlerDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // Mongoose ID error / Cast Error
  else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // Mongoose Validation Error
  else if (error.name === "ValidationError") {
    const simplifiedError = handlerValidationError(error);
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
    message = simplifiedError.message;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: envVars.NODE_ENV === "development" ? error : null,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};

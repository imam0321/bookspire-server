import AppError from "../../errorHelpers/AppError.js";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { setAuthCookie } from "../../utils/setAuthCookie.js";
import { AuthServices } from "./auth.service.js";
import httpStatus from "http-status-codes";

const credentialLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const userInfo = await AuthServices.credentialLogin({ email, password });

  setAuthCookie(res, userInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User Login Successfully",
    data: userInfo,
  });
});

const getNewAccessToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "Refresh Token Not Found");
  }

  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

  setAuthCookie(res, tokenInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New Access Token Retried Successfully",
    data: tokenInfo,
  });
});

export const AuthControllers = {
  credentialLogin,
  getNewAccessToken,
};

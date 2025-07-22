import passport from "passport";
import { envVars } from "../../config/env.js";
import AppError from "../../errorHelpers/AppError.js";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { setAuthCookie } from "../../utils/setAuthCookie.js";
import { createUserTokens } from "../../utils/userTokens.js";
import { AuthService } from "./auth.service.js";
import httpStatus from "http-status-codes";

const credentialLogin = catchAsync(async (req, res, next) => {
  passport.authenticate("local", async (error, user, info) => {
    if (error) {
      return next(new AppError(httpStatus.BAD_REQUEST, error));
    }
    if (!user) {
      return next(new AppError(httpStatus.BAD_REQUEST, info.message));
    }

    const userTokens = await createUserTokens(user);

    const { password, ...rest } = user.toObject();

    setAuthCookie(res, userTokens);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Login Successfully",
      data: {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest,
      },
    });
  })(req, res, next);
});

const getNewAccessToken = catchAsync(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "Refresh Token Not Found");
  }

  const tokenInfo = await AuthService.getNewAccessToken(refreshToken);

  setAuthCookie(res, tokenInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New Access Token Retried Successfully",
    data: tokenInfo,
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const decodedToken = req.user;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Old and new password are required"
    );
  }

  await AuthService.resetPassword(decodedToken, oldPassword, newPassword);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Changed Successfully",
    data: null,
  });
});

const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged out Successfully",
    data: null,
  });
});

const googleCallbackController = catchAsync(async (req, res, next) => {
  let redirectTo = req.query.state ? req.query.state : "";

  if (redirectTo.startsWith("/")) {
    redirectTo = redirectTo.slice(1);
  }

  const user = req.user;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const tokenInfo = createUserTokens(user);

  setAuthCookie(res, tokenInfo);

  res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
});

export const AuthController = {
  credentialLogin,
  getNewAccessToken,
  resetPassword,
  logout,
  googleCallbackController,
};

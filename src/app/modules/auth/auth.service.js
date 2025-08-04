import { envVars } from "../../config/env.js";
import AppError from "../../errorHelpers/AppError.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens.js";
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

const getNewAccessToken = async (refreshToken) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (decodedToken, oldPassword, newPassword) => {
  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!user.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Password is not set for this user"
    );
  }

  const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user.password);

  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password dose not match");
  }

  user.password = await bcryptjs.hash(newPassword, 10);

  await user.save();
};

const forgetPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!user.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Password is not set for this user. You ar already login by google!"
    );
  }

  if (user.isActive === "block") {
    throw new AppError(httpStatus.BAD_REQUEST, `User block!`);
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const resetToken = jwt.sign(jwtPayload, envVars.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });

  const resetUILink = `${envVars.FRONTEND_URL}/reset-password?id=${user._id}&token=${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Password Reset",
    templateName: "forgetPassword",
    templateData: {
      name: user.name,
      resetUILink,
    },
  });
};

const resetPassword = async (decodedToken, id, newPassword) => {
  if (id != decodedToken.userId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can not reset your password!"
    );
  }

  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not Found");
  }

  const hashPassword = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  user.password = hashPassword;

  user.save();
};

export const AuthService = {
  getNewAccessToken,
  changePassword,
  forgetPassword,
  resetPassword,
};

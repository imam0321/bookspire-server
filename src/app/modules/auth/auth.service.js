import AppError from "../../errorHelpers/AppError.js";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens.js";
import { User } from "../user/user.model.js";
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";

const getNewAccessToken = async (refreshToken) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};

const resetPassword = async (decodedToken, oldPassword, newPassword) => {
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
  return { message: "Password reset successfully" };
};

const setPassword = async (userId, plainPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not Found");
  }

  const isGoogleProvider = user?.auths.some(
    (providerObject) => providerObject.provider === "Google"
  );

  if (user?.password && isGoogleProvider) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already set your password"
    );
  }

  const hashPassword = await bcryptjs.hash(
    plainPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const credentialProvider = {
    provider: "Credential",
    providerId: user?.email,
  };

  const auths = [...user.auths, credentialProvider];

  user.password = hashPassword;
  user.auths = auths;

  await user.save();
};

export const AuthService = {
  getNewAccessToken,
  resetPassword,
  setPassword
};

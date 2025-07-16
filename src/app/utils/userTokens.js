import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/AppError.js";
import { User } from "../modules/user/user.model.js";
import { generateToken, verifyToken } from "./jwt.js";

export const createUserTokens = (user) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (refreshToken) => {
  const verifiedToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET);

  const isUserExist = await User.findOne({ email: verifiedToken.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Not Exist!");
  }

  if (isUserExist.isActive === "block") {
    throw new AppError(httpStatus.BAD_REQUEST, "User Block");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken;
};

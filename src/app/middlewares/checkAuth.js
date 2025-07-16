import AppError from "../errorHelpers/AppError.js";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt.js";
import { envVars } from "../config/env.js";
import { User } from "../modules/user/user.model.js";

export const checkAuth =
  (...authRoles) =>
  async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "No Token found");
      }

      const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);

      const isUserExist = await User.findOne({ email: verifiedToken.email });

      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Not Exist!");
      }

      if (isUserExist.isActive === "block") {
        throw new AppError(httpStatus.BAD_REQUEST, "User Block");
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.BAD_GATEWAY,
          "You are not permitted to view this route!!"
        );
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };

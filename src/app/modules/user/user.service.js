import AppError from "../../errorHelpers/AppError.js";
import { User } from "./user.model.js";
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";

const createUser = async (payload) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User All Ready Exist");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const authProvider = {
    provider: "Credential",
    providerId: email,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({role: "user"}).select("-password");
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

const getAllSellers = async () => {
  const sellers = await User.find({ role: "seller" }).select("-password");
  const totalSellers = await User.countDocuments({ role: "seller" });

  return {
    data: sellers,
    meta: {
      total: totalSellers,
    },
  };
};

const updateUser = async (userId, payload) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not Exist");
  }

  if (payload.email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email not updatable")
  }
  if (payload.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password not updatable")
  }

  const updateUser = await User.findByIdAndUpdate(userId, payload,{
    new: true,
    runValidators: true,
  }).select("-password");

  return updateUser;
};

const getMe = async (userId) => {
  const myInfo = await User.findById(userId).select("-password");
  return {
    data: myInfo,
  };
};

export const UserService = {
  createUser,
  getAllUsers,
  getAllSellers,
  updateUser,
  getMe
};

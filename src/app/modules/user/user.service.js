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
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

const getAllSellers = async () => {
  const sellers = await User.find({ role: "seller" });
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

  const updateUser = await User.findByIdAndUpdate(userId, payload,{
    new: true,
    runValidators: true,
  });

  return updateUser;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getAllSellers,
  updateUser,
};

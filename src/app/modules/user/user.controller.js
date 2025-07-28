import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { UserService } from "./user.service.js";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserService.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All User Get Successfully",
    data: result,
  });
});

const getAllSellers = catchAsync(async (req, res, next) => {
  const query = { role: "seller" };
  const result = await UserService.getAllSellers(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Seller Get Successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const updateData = req.body;

  const result = await UserService.updateUser(userId, updateData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User Updated Successfully",
    data: result,
  });
});

const getMe = catchAsync(
  async (req, res, next) => {
    const decodedToken = req.user;
    const result = await UserService.getMe(decodedToken.userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your Profile Retrieved Successfully",
      data: result.data,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  getAllSellers,
  updateUser,
  getMe
};

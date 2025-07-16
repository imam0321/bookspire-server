import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { UserServices } from "./user.service.js";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserServices.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All User Get Successfully",
    data: result,
  });
});

const getAllSellers = catchAsync(async (req, res, next) => {
  const query = { role: "seller" };
  const result = await UserServices.getAllSellers(query);
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

  const result = await UserServices.updateUser(userId, updateData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User Updated Successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  getAllSellers,
  updateUser,
};

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

export const UserControllers = {
  createUser,
}

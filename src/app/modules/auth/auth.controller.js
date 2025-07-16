import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { AuthServices } from "./auth.service.js";
import httpStatus from "http-status-codes";

const credentialLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await AuthServices.credentialLogin({ email, password });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "User Login Successfully",
    data: result,
  });
});

export const AuthControllers = {
  credentialLogin,
};

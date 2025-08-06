import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status-codes";
import { BorrowService } from "./borrow.service.js";

const borrow = catchAsync(async (req, res, next) => {
  const decodedToken = req.user;
  const { productId, quantity } = req.body;
  const result = await BorrowService.borrow(
    decodedToken.userId,
    productId,
    quantity
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product borrow Successfully",
    data: result,
  });
});

export const BorrowController = {
  borrow,
};

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

const getAllBorrows = catchAsync(async (req, res, next) => {
  const result = await BorrowService.getAllBorrow();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All product borrow list get Successfully",
    data: result,
  });
});

const getMyBorrows = catchAsync(async (req, res, next) => {
  const decodedToken = req.user;
  const result = await BorrowService.getMyBorrows(decodedToken.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My product borrow list get Successfully",
    data: result,
  });
});

const getSingleBorrow = catchAsync(async (req, res, next) => {
  const result = await BorrowService.getSingleBorrow(req.params.borrowId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get single borrow Successfully",
    data: result,
  });
});

export const BorrowController = {
  borrow,
  getAllBorrows,
  getMyBorrows,
  getSingleBorrow
};

import { envVars } from "../../config/env.js";
import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { PaymentService } from "./payment.service.js";
import httpStatus from "http-status-codes";


const initPayment = catchAsync(async (req, res, next) => {
  const borrowId = req.params.borrowId;
  const result = await PaymentService.initPayment(borrowId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Payment done Successfully",
    data: result,
  });
});

const successPayment = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await PaymentService.successPayment(query);

  if (result.success) {
    res.redirect(
      `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&quantity=${query.quantity}&status=${query.status}`
    );
  }
});

const failPayment = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await PaymentService.failPayment(query);

  if (!result.success) {
    res.redirect(
      `${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&quantity=${query.quantity}&status=${query.status}`
    );
  }
});

const cancelPayment = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await PaymentService.cancelPayment(query);

  if (!result.success) {
    res.redirect(
      `${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&quantity=${query.quantity}&status=${query.status}`
    );
  }
});

export const PaymentController = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};

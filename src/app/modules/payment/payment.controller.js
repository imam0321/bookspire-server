import { envVars } from "../../config/env.js";
import catchAsync from "../../utils/catchAsync.js";
import { PaymentService } from "./payment.service.js";

const successPayment = catchAsync(async (req, res, next) => {
  const query = req.query;
  const result = await PaymentService.successPayment(query);

  if (result.success) {
    res.redirect(
      `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`
    );
  }
});

export const PaymentController = {
  successPayment,
};

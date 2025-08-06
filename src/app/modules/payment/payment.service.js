import AppError from "../../errorHelpers/AppError.js";
import { Borrow } from "../borrow/borrow.model.js";
import { Payment } from "./payment.model.js";
import httpStatus from "http-status-codes";

const successPayment = async (query) => {
  const session = await Payment.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: "paid" },
      { new: true, runValidators: true, session }
    );

    if (!updatePayment)
      throw new AppError(httpStatus.NOT_FOUND, "Payment Not Found");

    const updateBorrow = await Borrow.findByIdAndUpdate(
      updatePayment.borrowId,
      { status: "complete" },
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { success: true, message: "Payment Completed successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const PaymentService = {
  successPayment,
};

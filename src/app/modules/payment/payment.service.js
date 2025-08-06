import AppError from "../../errorHelpers/AppError.js";
import { Borrow } from "../borrow/borrow.model.js";
import { Product } from "../products/products.model.js";
import { SSLService } from "../sslCommerz/sslCommerz.service.js";
import { User } from "../user/user.model.js";
import { Payment } from "./payment.model.js";
import httpStatus from "http-status-codes";

const initPayment = async (borrowId) => {
  const payment = await Payment.findOne({ borrowId: borrowId });

  if (!payment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment Not found. You have not booked this tour"
    );
  }

  const borrow = await Borrow.findById(payment.borrowId);
  const user = await User.findById(borrow.user);

  const userName = user?.name;
  const userEmail = user?.email;
  const userPhone = user?.phone;
  const userAddress = user?.address;
  const quantity = borrow?.quantity;

  const sslPayload = {
    name: userName,
    email: userEmail,
    phoneNumber: userPhone,
    address: userAddress,
    amount: payment.amount,
    quantity: quantity,
    transactionId: payment.transactionId,
  };

  const sslPayment = await SSLService.sslPaymentInit(sslPayload);

  await Product.updateStatus(borrow?.product, quantity);
  return {
    paymentUrl: sslPayment.GatewayPageURL,
  };
};

const successPayment = async (query) => {
  const session = await Borrow.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: "paid" },
      { new: true, runValidators: true, session }
    );

    if (!updatePayment)
      throw new AppError(httpStatus.NOT_FOUND, "Payment Not Found");

    await Borrow.findByIdAndUpdate(
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

const failPayment = async (query) => {
  const session = await Borrow.startSession();
  session.startTransaction();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: "failed" },
      { runValidators: true, session }
    );

    await Borrow.findByIdAndUpdate(
      updatedPayment?.borrowId,
      { status: "failed" },
      { runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { success: false, message: "Payment Failed!" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const cancelPayment = async (query) => {
  const session = await Borrow.startSession();
  session.startTransaction();
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: "cancelled" },
      { runValidators: true, session }
    );

    await Borrow.findByIdAndUpdate(
      updatedPayment?.borrowId,
      { status: "cancel" },
      { runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    return { success: false, message: "Payment Cancelled!" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};

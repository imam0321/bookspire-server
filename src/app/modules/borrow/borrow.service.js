import AppError from "../../errorHelpers/AppError.js";
import httpStatus from "http-status-codes";
import { Product } from "../products/products.model.js";
import { Borrow } from "./borrow.model.js";
import { User } from "../user/user.model.js";
import { getTransactionId } from "../../utils/getTransactionId.js";
import { Payment } from "../payment/payment.model.js";
import { SSLService } from "../sslCommerz/sslCommerz.service.js";

const borrow = async (userId, productId, quantity) => {
  const transactionId = getTransactionId();

  const session = await Borrow.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User Not found!");
    if (user.phone === "" || user.address === "") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Please update your phone and address to buy a book"
      );
    }

    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, "Product not found.");
    }

    if (typeof quantity !== "number" || quantity < 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Valid productId and positive quantity are required."
      );
    }

    if (product.copies < quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Only ${product.copies} items available in stock.`
      );
    }

    const totalPrice = product.resalePrice * quantity;

    const createBorrow = await Borrow.create(
      [
        {
          user: userId,
          product: productId,
          quantity: quantity,
          status: "pending",
        },
      ],
      { runValidators: true, session }
    );

    const cratePayment = await Payment.create(
      [
        {
          borrowId: createBorrow[0]._id,
          status: "unpaid",
          transactionId: transactionId,
          amount: totalPrice,
        },
      ],
      { runValidators: true, session }
    );

    const updateBorrow = await Borrow.findByIdAndUpdate(
      createBorrow[0]._id,
      {
        payment: cratePayment[0]._id,
      },
      { new: true, runValidators: true, session }
    )
      .populate("user", "name email phone address")
      .populate("product", "productName resalePrice")
      .populate("payment");

    const userName = updateBorrow?.name;
    const userEmail = updateBorrow?.email;
    const userPhone = updateBorrow?.phone;
    const userAddress = updateBorrow?.address;

    const sslPayload = {
      name: userName,
      email: userEmail,
      phoneNumber: userPhone,
      address: userAddress,
      amount: totalPrice,
      transactionId: transactionId,
    };

    const sslPayment = await SSLService.sslPaymentInit(sslPayload);

    await Product.updateStatus(productId, quantity);

    await session.commitTransaction();
    session.endSession();

    return {
      paymentUrl: sslPayment.GatewayPageURL,
      borrow: updateBorrow,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const BorrowService = {
  borrow,
};

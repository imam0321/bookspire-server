import { model, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    borrowId: {
      type: Schema.Types.ObjectId,
      ref: "Borrow",
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid", "cancelled", "failed", "refunded"],
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentGatewayData: {
      type: Schema.Types.Mixed,
    },
    invoiceUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Payment = model("Payment", paymentSchema);

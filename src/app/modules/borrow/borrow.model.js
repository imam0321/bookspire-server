import { model, Schema } from "mongoose";

const borrowSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product Id is required."],
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity at least 1 item"],
    },
    status: {
      type: String,
      enum: ["pending", "complete", "cancel", "failed"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

export const Borrow = model("Borrow", borrowSchema);

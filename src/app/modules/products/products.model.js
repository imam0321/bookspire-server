import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: { type: String },
    description: { type: String },
    resalePrice: { type: Number },
    originalPrice: { type: Number },
    usedPeriod: { type: String },
    category: { type: String },
    imgProduct: { type: String },
    location: { type: String },
    status: { type: String, enum: ["sold", "unsold"] },
    seller: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

export const Product = model("Product", productSchema);

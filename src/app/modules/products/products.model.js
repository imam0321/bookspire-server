import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
    },
    description: {
      type: String,
    },
    resalePrice: {
      type: Number,
      required: [true, "Resale price is required."],
      min: [0, "Resale price cannot be negative."],
    },
    originalPrice: {
      type: Number,
      required: [true, "Original price is required."],
      min: [0, "Original price cannot be negative."],
    },
    usedPeriod: {
      type: String,
      required: [true, "Used period is required."],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
      enum: {
        values: [
          "Novel",
          "Poetry",
          "Non Fiction",
          "Academic",
          "Research and Journal",
        ],
        message:
          "Category must be one of: Novel, Poetry, Non Fiction, Academic, or Research and Journal.",
      },
    },
    imgProduct: {
      type: String,
      // required: [true, "Product image URL is required."],
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["sold", "unsold"],
        message: "Status must be either 'sold' or 'unsold'.",
      },
      default: "unsold",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const Product = model("Product", productSchema);

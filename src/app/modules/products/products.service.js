import AppError from "../../errorHelpers/AppError.js";
import { Product } from "./products.model.js";
import httpStatus from "http-status-codes";

const create = async (payload) => {
  if (
    !payload.productName ||
    !payload.resalePrice ||
    !payload.originalPrice ||
    !payload.usedPeriod ||
    !payload.category
  ) {
    throw new Error("Missing required fields");
  }

  const product = await Product.create(payload);
  return product;
};

const update = async (id, payload) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found!");
  }
  console.log(product);
  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedProduct;
};

export const ProductService = {
  create,
  update,
};

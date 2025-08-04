import { Product } from "./products.model.js";

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

export const ProductService = {
  create,
};

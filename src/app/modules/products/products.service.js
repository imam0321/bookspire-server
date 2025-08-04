import AppError from "../../errorHelpers/AppError.js";
import { QueryBuilder } from "../../utils/QueryBuilder.js";
import { User } from "../user/user.model.js";
import { ProductSearchableFields } from "./product.constant.js";
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

const getAllProducts = async (query) => {
  const queryBuilder = new QueryBuilder(Product.find(), query);
  const users = queryBuilder
    .search(ProductSearchableFields)
    .fields()
    .sort()
    .filter()
    .paginate();

  const [data, meta] = await Promise.all([
    users.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getMyProducts = async (userId, query) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found!");
  }

  const queryBuilder = new QueryBuilder(
    Product.find({ seller: user._id }),
    query
  );
  const users = queryBuilder
    .search(ProductSearchableFields)
    .fields()
    .sort()
    .filter()
    .paginate();

  const [data, meta] = await Promise.all([
    users.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSingleProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found!");
  }

  return product;
};

const update = async (id, payload) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found!");
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found!");
  }

  await Product.findByIdAndDelete(id);

  return null;
};

export const ProductService = {
  create,
  getAllProducts,
  getMyProducts,
  getSingleProduct,
  update,
  deleteProduct,
};

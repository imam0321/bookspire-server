import catchAsync from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status-codes";
import { ProductService } from "./products.service.js";

const create = catchAsync(async (req, res, next) => {
  const result = await ProductService.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created Successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const result = await ProductService.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All products retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getMyProducts = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const result = await ProductService.getMyProducts(userId, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My all products retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleProduct = catchAsync(async (req, res, next) => {
  const result = await ProductService.getSingleProduct(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved Successfully",
    data: result,
  });
});

const update = catchAsync(async (req, res, next) => {
  const result = await ProductService.update(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated Successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const result = await ProductService.deleteProduct(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted Successfully",
    data: result,
  });
});

export const ProductController = {
  create,
  getAllProducts,
  getMyProducts,
  getSingleProduct,
  update,
  deleteProduct,
};

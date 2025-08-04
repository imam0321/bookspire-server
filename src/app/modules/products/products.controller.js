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
    statusCode: httpStatus.CREATED,
    success: true,
    message: "All Product retrieved Successfully",
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

export const ProductController = {
  create,
  getAllProducts,
  update,
};

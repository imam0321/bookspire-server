import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { ProductController } from "./products.controller.js";

const router = Router();

router.post("/create", checkAuth("seller"), ProductController.create);
router.get("/", checkAuth("admin"), ProductController.getAllProducts); // todo
// router.get(
//   "/my-products",
//   checkAuth("seller"),
//   ProductController.getMyProducts
// ); // todo
// router.get("/:id", checkAuth("admin"), ProductController.getSingleProducts); // todo
router.patch("/update/:id", checkAuth("seller"), ProductController.update);
// router.post(
//   "/delete/:id",
//   checkAuth("seller", "admin"),
//   ProductController.deleteProduct
// ); // todo

export const ProductRoutes = router;

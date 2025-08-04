import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { ProductController } from "./products.controller.js";

const router = Router();

router.post("/create", checkAuth("seller"), ProductController.create);
router.get("/", checkAuth("admin"), ProductController.getAllProducts);
router.get(
  "/my-products",
  checkAuth("seller"),
  ProductController.getMyProducts
);
router.get(
  "/:id",
  checkAuth("admin", "user", "seller"),
  ProductController.getSingleProduct
);
router.patch("/update/:id", checkAuth("seller"), ProductController.update);
router.delete(
  "/:id",
  checkAuth("seller", "admin"),
  ProductController.deleteProduct
);

export const ProductRoutes = router;

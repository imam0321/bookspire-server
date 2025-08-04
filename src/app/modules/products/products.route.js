import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { ProductController } from "./products.controller.js";

const router = Router();

router.post("/create", checkAuth("seller"), ProductController.create);

export const ProductRoutes = router;

import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { BorrowController } from "./borrow.controller.js";

const router = Router();

router.post("/", checkAuth("user", "seller"), BorrowController.borrow);

export const BorrowRoutes = router;

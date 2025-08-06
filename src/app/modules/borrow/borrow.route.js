import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { BorrowController } from "./borrow.controller.js";

const router = Router();

router.post("/", checkAuth("admin", "user", "seller"), BorrowController.borrow);
router.get("/", checkAuth("admin"), BorrowController.getAllBorrows);
router.get(
  "/my-borrows",
  checkAuth("admin", "user", "seller"),
  BorrowController.getMyBorrows
);
router.get(
  "/:borrowId",
  checkAuth("admin", "user", "seller"),
  BorrowController.getSingleBorrow
);

export const BorrowRoutes = router;

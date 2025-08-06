import { Router } from "express";
import { PaymentController } from "./payment.controller.js";


const router = Router();

router.post("/success", PaymentController.successPayment);

export const PaymentRoutes = router;

import { Router } from "express";
import { AuthControllers } from "./auth.controller.js";


const router = Router();

router.post("/login", AuthControllers.credentialLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken);

export const AuthRoutes = router;
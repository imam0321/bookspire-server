import { Router } from "express";
import { UserController } from "./user.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

const router = Router();

router.post("/register", UserController.createUser);
router.get("/all-users", checkAuth("admin"), UserController.getAllUsers);
router.get("/sellers", checkAuth("admin"), UserController.getAllSellers);
router.get("/me", checkAuth("admin", "user", "seller"), UserController.getMe);
router.post("/:id", checkAuth("admin", "user", "seller"), UserController.updateUser);

export const UserRoutes = router;

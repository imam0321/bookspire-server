import { Router } from "express";
import { UserControllers } from "./user.controller.js";

const router = Router();

router.post("/register", UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUsers);
router.get("/sellers", UserControllers.getAllSellers);
router.post("/:id", UserControllers.updateUser);

export const UserRoutes = router;

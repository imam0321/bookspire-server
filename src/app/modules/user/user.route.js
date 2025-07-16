import { Router } from "express";
import { UserControllers } from "./user.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

const router = Router();

router.post("/register", UserControllers.createUser);
router.get("/all-users", checkAuth("admin"), UserControllers.getAllUsers);
router.get("/sellers", checkAuth("admin"), UserControllers.getAllSellers);
router.post("/:id", checkAuth("admin", "seller"), UserControllers.updateUser);

export const UserRoutes = router;

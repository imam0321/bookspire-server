import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { ProductRoutes } from "../modules/products/products.route.js";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

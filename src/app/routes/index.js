import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { ProductRoutes } from "../modules/products/products.route.js";
import { BorrowRoutes } from "../modules/borrow/borrow.route.js";

export const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/borrow",
    route: BorrowRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

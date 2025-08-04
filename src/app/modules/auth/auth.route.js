import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import passport from "passport";
import { checkAuth } from "../../middlewares/checkAuth.js";

const router = Router();

router.post("/login", AuthController.credentialLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post(
  "/change-password",
  checkAuth("admin", "user", "seller"),
  AuthController.resetPassword
);
router.post("/logout", AuthController.logout);
router.get("/google", async (req, res, next) => {
  const redirect = req.query.redirect || "/";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect,
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  AuthController.googleCallbackController
);

export const AuthRoutes = router;

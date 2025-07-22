import cors from "cors";
import express from "express";
import httpStatus from "http-status-codes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import { router } from "./app/routes/index.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import { envVars } from "./app/config/env.js";
import "./app/config/passport.js";

const app = express();

app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    message: "Welcome to Bookspire",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

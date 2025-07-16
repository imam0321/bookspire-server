import cors from "cors";
import express from "express";
import httpStatus from "http-status-codes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import { router } from "./app/routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

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

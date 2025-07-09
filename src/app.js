import express from "express";
import httpStatus from "http-status-codes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import { router } from "./app/routes/index.js";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    message: "Welcome to Bookspire",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

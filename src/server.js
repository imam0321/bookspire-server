import mongoose from "mongoose";
import { envVars } from "./app/config/env.js";
import app from "./app.js";

let server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to DB!");
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to Port ${envVars.PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected... server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// uncaught rejection error
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// signal termination sigterm
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

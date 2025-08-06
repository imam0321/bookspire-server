import dotenv from "dotenv";

dotenv.config();

const loadEnvVariables = () => {
  const requiredEnvVariable = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SESSION_SECRET",
    "FRONTEND_URL",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
    "SMTP_HOST",
    "SMTP_POST",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
    "SSL_STORE_ID",
    "SSL_STORE_PASS",
    "SSL_PAYMENT_API",
    "SSL_VALIDATION_API",
    "SSL_IPN_URL",
    "SSL_SUCCESS_FRONTEND_URL",
    "SSL_FAIL_FRONTEND_URL",
    "SSL_CANCEL_FRONTEND_URL",
    "SSL_SUCCESS_BACKEND_URL",
    "SSL_FAIL_BACKEND_URL",
    "SSL_CANCEL_BACKEND_URL",
  ];

  requiredEnvVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    EMAIL_SENDER: {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_POST: process.env.SMTP_POST,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      SMTP_FROM: process.env.SMTP_FROM,
    },
    SSL: {
      SSL_STORE_ID: process.env.SSL_STORE_ID,
      SSL_STORE_PASS: process.env.SSL_STORE_PASS,
      SSL_PAYMENT_API: process.env.SSL_PAYMENT_API,
      SSL_VALIDATION_API: process.env.SSL_VALIDATION_API,
      SSL_IPN_URL: process.env.SSL_IPN_URL,
      SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL,
      SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL,
      SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL,
      SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL,
      SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL,
      SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL,
    },
  };
};

export const envVars = loadEnvVariables();

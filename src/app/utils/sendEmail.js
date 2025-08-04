import nodemailer from "nodemailer";
import { envVars } from "../config/env.js";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import AppError from "../errorHelpers/AppError.js";

const transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER.SMTP_HOST,
  port: Number(envVars.EMAIL_SENDER.SMTP_POST),
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS,
  },
});

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.join(
      __dirname,
      `templates/${templateName}.ejs`
    );
    const html = await ejs.renderFile(templatePath, templateData);

    await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });
  } catch (error) {
    throw new AppError(401, "Email error", error.message);
  }
};

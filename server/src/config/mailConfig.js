import nodemailer from "nodemailer";

import { MAIL_PSWRD, EMAIL } from "./serverconfig.js";

export const Sender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: MAIL_PSWRD,
  },
});

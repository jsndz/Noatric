import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const STRIPE_SK = process.env.STRIPE_SK;
export const MAIL_PSWRD = process.env.MAIL_PSWRD;
export const EMAIL = process.env.MAIL;

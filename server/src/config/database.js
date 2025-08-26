import mongoose from "mongoose";
import { DB_PASSWORD, DB_USER } from "./serverconfig.js";
const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@noah.ybwmt8i.mongodb.net/UrbanHaven?retryWrites=true&w=majority&appName=Noah`;
export const connect = async () => {
  mongoose
    .connect(URL)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
      console.error("Database connection error:", err);
      console.log(URL);
    });
};

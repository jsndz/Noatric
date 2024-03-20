import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./src/config/serverconfig.js";
import { connect } from "./src/config/database.js";
import apiRoute from "./src/routes/index.js";

const app = express();

const setUp = async () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoute);
  app.listen(PORT, async () => {
    console.log(`server started at port ${PORT}`);
    await connect();
    console.log("MongoDB connected");
    console.log("Server started");
  });
};
setUp();

import express from "express";
import {
  createUser,
  LoginUser,
  addAddress,
  getAddresses,
} from "../../Controllers/User-controller.js";
import { authenticateToken } from "../../middlewares/verify.js";
import { getToken, sendEmail } from "../../services/Email-services.js";

const router = express.Router();

// Routes with fixed paths and no parameters
router.post("/signup", createUser);
router.post("/login", LoginUser);
router.post("/reset-password", getToken);

// Routes with fixed paths and authentication
router.patch("/address", authenticateToken, addAddress);
router.get("/address", authenticateToken, getAddresses);

// Routes with parameters
router.post("/reset-password/:email", sendEmail);

export default router;

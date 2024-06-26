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

router.post("/auth/signup", createUser);
router.post("/auth/login", LoginUser);
router.patch("/auth/address", authenticateToken, addAddress);
router.get("/auth/address", authenticateToken, getAddresses);
router.post("/auth/reset-password/:email", sendEmail);
router.post("/auth/reset-password", getToken);
export default router;

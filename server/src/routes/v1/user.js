import express from "express";
import {
  getUserInfo,
  removeAddress,
  editAddress,
  editName,
} from "../../Controllers/User-controller.js";
import { authenticateToken } from "../../middlewares/verify.js";

const router = express.Router();

// Routes with multiple parameters
router.patch("/edit-name/:name", authenticateToken, editName);
router.delete("/address/:index", authenticateToken, removeAddress);
router.patch("/address/:index", authenticateToken, editAddress);

// Routes with fixed paths and authentication
router.get("/", authenticateToken, getUserInfo);

export default router;

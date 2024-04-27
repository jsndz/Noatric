import express from "express";
import {
  getUserInfo,
  removeAddress,
  editAddress,
} from "../../Controllers/User-controller.js";
import { authenticateToken } from "../../middlewares/verify.js";

const router = express.Router();

router.get("/user", authenticateToken, getUserInfo);
router.delete("/user/address/:index", authenticateToken, removeAddress);
router.patch("/user/address/:index", authenticateToken, editAddress);
export default router;

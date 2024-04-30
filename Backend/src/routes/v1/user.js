import express from "express";
import {
  getUserInfo,
  removeAddress,
  editAddress,
  editName,
} from "../../Controllers/User-controller.js";
import { authenticateToken } from "../../middlewares/verify.js";

const router = express.Router();

router.get("/user", authenticateToken, getUserInfo);
router.delete("/user/address/:index", authenticateToken, removeAddress);
router.patch("/user/address/:index", authenticateToken, editAddress);
router.patch("/user/edit-name/:name", authenticateToken, editName);
export default router;

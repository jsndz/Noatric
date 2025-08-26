import express from "express";
import { getCategories } from "../../Controllers/Category-controller.js";
const router = express.Router();
router.get("/", getCategories);
export default router;

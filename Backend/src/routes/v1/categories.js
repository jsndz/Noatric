import express from "express";
import { getCategories } from "../../Controllers/Category-controller.js";
const router = express.Router();
router.get("/categories", getCategories);
// router.post("/categories", createCategory);
export default router;

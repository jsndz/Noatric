import express from "express";
import {
  createCategory,
  fetchCategory,
} from "../../controller/category-controller.js";
const router = express.Router();
router.get("/categories", fetchCategory);
router.post("/categories", createCategory);
export default router;

import express from "express";
import {
  createBrand,
  fetchAllBrand,
} from "../../controller/brand-controller.js";
const router = express.Router();
router.get("/brands", fetchAllBrand);
router.post("/brands", createBrand);
export default router;

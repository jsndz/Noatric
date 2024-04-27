import express from "express";
import { getBrands, createBrand } from "../../Controllers/Brand-controller.js";
const router = express.Router();
router.get("/brands", getBrands);
router.post("/brands", createBrand);
export default router;

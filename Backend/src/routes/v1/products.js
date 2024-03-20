import express from "express";
import { getProducts } from "../../Controllers/Product-controller.js";
// import { authenticate } from "../../middleware/authenticate.js";
const router = express.Router();

// router.post("/products", authenticate, createProduct);
router.get("/products", getProducts);
// router.get("/products/:id", fetchProductById);
// router.patch("/products/:id", updateProduct);
export default router;

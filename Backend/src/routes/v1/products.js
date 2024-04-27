import express from "express";
import {
  getProductById,
  getProducts,
  getProductsByFilter,
  updatedProduct,
  createProduct,
  deleteProduct,
} from "../../Controllers/Product-controller.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/products", getProducts);
router.get("/productsByFilter", getProductsByFilter);
router.get("/products/:id", getProductById);
router.patch("/product/:id", updatedProduct);
router.delete("/product/:id", deleteProduct);

export default router;

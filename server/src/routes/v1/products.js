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

// Routes with fixed paths
router.get("/productsByFilter", getProductsByFilter);
router.post("/", createProduct);
router.get("/", getProducts);

// Routes with parameters
router.get("/:id", getProductById);
router.patch("/:id", updatedProduct);
router.delete("/:id", deleteProduct);

export default router;

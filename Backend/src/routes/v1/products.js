import express from "express";
import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from "../../controller/product-controller.js";
import { authenticate } from "../../middleware/authenticate.js";
const router = express.Router();

router.post("/products", authenticate,createProduct);
router.get("/products", fetchAllProducts);
router.get('/products/:id',fetchProductById);
router.patch('/products/:id',updateProduct)
export default router;

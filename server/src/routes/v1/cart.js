import express from "express";
import {
  addCartItem,
  getTotalProducts,
  getProducts,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
  getAll,
  getCartID,
} from "../../Controllers/Cart-controller.js";

import { authenticateToken } from "../../middlewares/verify.js";
const router = express.Router();
// Specific route first
router.get("/carts/c", getAll);

// Next, more general route
router.get("/carts", authenticateToken, getCartID);

// Routes with multiple parameters
router.delete("/carts/:cartId/product/:productId", removeProduct);
router.patch("/carts/:cartId/product/:productId/increase", increaseQuantity);
router.delete("/carts/:cartId/product/:productId/decrease", decreaseQuantity);

// Routes with single parameters
router.patch("/carts/:id", addCartItem);
router.get("/carts/:cartId", getTotalProducts);
router.get("/carts/:id/items", getProducts);
router.patch("/carts/empty/:id", emptyCart);

export default router;

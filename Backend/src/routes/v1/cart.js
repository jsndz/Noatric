import express from "express";
import {
  addCartItem,
  getTotalProducts,
  getProducts,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
  getCartID,
} from "../../Controllers/Cart-controller.js";

import { authenticateToken } from "../../middlewares/verify.js";
const router = express.Router();
router.patch("/carts/:id", addCartItem);
router.get("/carts/:id", getTotalProducts);
router.get("/carts/:id/items", getProducts);
router.delete("/carts/:cartId/product/:productId", removeProduct);
router.patch("/carts/:cartId/product/:productId/increase", increaseQuantity);
router.delete("/carts/:cartId/product/:productId/decrease", decreaseQuantity);
router.patch("/cart/empty/:id", emptyCart);
router.get("/cartId", authenticateToken, getCartID);
export default router;

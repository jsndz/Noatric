import express from "express";
import {
  addToCart,
  fetchCartByUser,
  updateCart,
  deleteCart
} from "../../controller/cart-controller.js";
const router = express.Router();
router.get("/carts", fetchCartByUser);
router.post("/carts", addToCart);
router.patch("/carts/:id", updateCart);
router.delete("/carts/:id", deleteCart);
export default router;

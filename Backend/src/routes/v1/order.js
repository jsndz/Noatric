import express from "express";
import {
  createOrder,
  orderInfo,
  orderItems,
  allOrders,
  orderProducts,
  updateOrderStatus,
} from "../../Controllers/Order-controller.js";
import { authenticateToken } from "../../middlewares/verify.js";

const router = express.Router();

router.post("/orders", authenticateToken, createOrder);
router.get("/orders", authenticateToken, orderInfo);
router.get("/orderItems", authenticateToken, orderItems);
router.get("/allOrder", allOrders);
router.get("/orderProducts/:orderId", orderProducts);
router.get("/order/:orderId", orderProducts);

router.patch("/orderStatus", updateOrderStatus);
export default router;

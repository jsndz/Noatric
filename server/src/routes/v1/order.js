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

// Routes with parameters
router.get("/orderProducts/:orderId", orderProducts);

// Routes with fixed paths and authentication
router.get("/orderItems", authenticateToken, orderItems);
router.post("/", authenticateToken, createOrder);
router.get("/", authenticateToken, orderInfo);

// Routes with fixed paths
router.get("/allOrder", allOrders);
router.patch("/orders/orderStatus", updateOrderStatus);

export default router;

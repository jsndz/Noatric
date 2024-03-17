import express from "express";
import {
  createOrder,
  fetchOrderByUser,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
  payment,
} from "../../controller/order-controller.js";
import { authenticate } from "../../middleware/authenticate.js";
const router = express.Router();
router.get("/Orders", fetchOrderByUser);
router.post("/Orders", authenticate,createOrder);
router.patch("/Orders/:id", updateOrder);
router.delete("/Orders/:id", deleteOrder);
router.get('/Orders/:id',fetchAllOrders);
router.get('Orders/create-payment-intent',payment)
export default router;

import OrderService from "../services/Order-services.js";
import { getIdFromMail } from "../middlewares/functions.js";
async function createOrder(req, res) {
  try {
    const orderService = new OrderService();
    const email = req.user.email;
    const userId = await getIdFromMail(email);
    const order = await orderService.createOrder(req.body, userId);
    return res.status(201).json({
      data: order,
      success: true,
      message: "successfully returned a orders",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return  orders",
      err: { error },
    });
  }
}

async function getOrders(req, res) {
  try {
    const orderService = new OrderService();
    const orderId = await orderService.getOrders();
    return res.status(201).json({
      data: orderId,
      success: true,
      message: "successfully returned a orders",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return  orders",
      err: { error },
    });
  }
}

async function getOrderById(req, res) {
  try {
    const orderService = new OrderService();
    const id = req.params.id;
    const order = await orderService.getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function updateOrder(req, res) {
  try {
    const orderService = new OrderService();
    const id = req.params.id;
    const order = req.body;
    const updatedOrder = await orderService.updateOrder(id, order);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteOrder(req, res) {
  try {
    const orderService = new OrderService();
    const id = req.params.id;
    await orderService.deleteOrder(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function deleteAllOrders(req, res) {
  try {
    const orderService = new OrderService();
    await orderService.deleteAllOrders();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function orderInfo(req, res) {
  try {
    const orderService = new OrderService();
    const userEmail = req.user.email;
    const orders = await orderService.orderInfo(userEmail);
    return res.status(201).json({
      data: orders,
      success: true,
      message: "successfully returned a order",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return  order",
      err: { error },
    });
  }
}
async function orderItems(req, res) {
  try {
    const orderService = new OrderService();
    const userEmail = req.user.email;
    const orderItem = await orderService.orderItems(userEmail);
    return res.status(201).json({
      data: orderItem,
      success: true,
      message: "successfully returned a order items",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return order items",
      err: { error },
    });
  }
}

async function allOrders(req, res) {
  try {
    const orderService = new OrderService();
    var allOrders = await orderService.getAllOrders();

    if (req.query._sort && req.query._order) {
      const { _sort, _order } = req.query;
      allOrders.sort((a, b) => {
        if (_order === "asc") {
          return a[_sort] - b[_sort];
        } else {
          return b[_sort] - a[_sort];
        }
      });
    }

    console.log(req.query);
    const totalDocs = allOrders.length;

    if (req.query._page && req.query._limit) {
      const pageSize = parseInt(req.query._limit);
      const page = parseInt(req.query._page);
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      allOrders = allOrders.slice(startIndex, endIndex);
    }

    res.set("X-Total-Count", totalDocs);

    return res.status(200).json({
      data: allOrders,
      success: true,
      message: "Successfully returned order items",
      err: {},
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Couldn't return order items",
      err: { error },
    });
  }
}

async function orderProducts(req, res) {
  try {
    const orderService = new OrderService();
    const orderId = req.params.orderId;
    const orderItems = await orderService.getOrderProducts(orderId);
    return res.status(201).json({
      data: orderItems,
      success: true,
      message: "successfully returned a order items",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return order items",
      err: { error },
    });
  }
}

async function getOrder(req, res) {
  try {
    const orderService = new OrderService();
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);
    return res.status(201).json({
      data: order,
      success: true,
      message: "successfully returned a order ",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return order ",
      err: { error },
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const orderService = new OrderService();
    const newOrder = req.body;
    console.log(newOrder);
    const order = await orderService.updateOrder(newOrder);
    return res.status(201).json({
      data: order,
      success: true,
      message: "successfully returned a order ",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't return order ",
      err: { error },
    });
  }
}
export {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  deleteAllOrders,
  orderInfo,
  orderItems,
  allOrders,
  orderProducts,
  getOrder,
  updateOrderStatus,
};

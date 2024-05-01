import OrderRepository from "../repositories/Order-repository.js";
import UserRepository from "../repositories/User-repository.js";
import CartRepository from "../repositories/Cart-repository.js";
import ProductRepository from "../repositories/Product-repository.js";
import { getIdFromMail, getUserFromMail } from "../middlewares/functions.js";
import User from "../models/User.js";
class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.userRepository = new UserRepository();
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }

  async createOrder(order, userId) {
    try {
      const cartId = await this.userRepository.getCartId(userId);
      const items = await this.cartRepository.getItems(cartId);
      for (const item of items) {
        const product = await this.productRepository.decreaseStock(
          item.productId,
          item.quantity
        );
      }
      const ordr = { ...order, user: userId, items: items };
      const orderDetails = await this.orderRepository.create(ordr);
      const user = await this.userRepository.findById(userId);
      user.orders.push(orderDetails._id);

      await user.save();
      return orderDetails;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      console.log(error);
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.orderRepository.getAll();
      return orders;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      console.log(error);
    }
  }

  async getOrderById(id) {
    try {
      const order = await this.orderRepository.getOrder(id);
      return order;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      console.log(error);
    }
  }

  async updateOrder(id, order) {
    return await this.orderRepository.update(id, order);
  }

  async deleteOrder(id) {
    return await this.orderRepository.delete(id);
  }

  async deleteAllOrders() {
    return await this.orderRepository.deleteAll();
  }

  async orderInfo(userEmail) {
    try {
      const user = await getUserFromMail(userEmail);
      // const orderId = user.orders[0];
      // const order = await this.orderRepository.getOrder(orderId);
      const orders = await this.orderRepository.getAll();
      return orders;
    } catch (error) {
      console.log("Something went wrong in Service layer", error);
      throw { error };
    }
  }
  async orderItems(userEmail) {
    try {
      const user = await getUserFromMail(userEmail);
      const orderId = user.orders[0];
      const items = await this.orderRepository.getProducts(orderId);
      return items;
    } catch (error) {
      console.log("Something went wrong in Service layer", error);
      throw { error };
    }
  }
  async getOrderProducts(orderId) {
    try {
      const items = await this.orderRepository.getProducts(orderId);
      return items;
    } catch (error) {
      console.log("Something went wrong in Service layer", error);
      throw { error };
    }
  }
  async updateOrder(orderData) {
    try {
      const id = orderData.id;
      const order = await this.orderRepository.updateOrder(id, orderData);
    } catch (error) {
      console.log("Something went wrong in Service layer", error);
      throw { error };
    }
  }
}

export default OrderService;

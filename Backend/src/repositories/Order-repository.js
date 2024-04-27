import CrudRepository from "./Crud-repository.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

class OrderRepository extends CrudRepository {
  constructor() {
    super(Order);
  }
  async getProducts(orderId) {
    try {
      const orderItems = [];
      const order = await Order.findById(orderId)
        .populate("items.productId")
        .exec();
      if (!order) {
        console.log("order not found, returning", order);
        return orderItems;
      }

      for (const item of order.items) {
        const product = await Product.findById(item.productId);
        if (product) {
          orderItems.push({
            product: product,
            quantity: item.quantity,
          });
        }
      }
      return orderItems;
    } catch (error) {
      console.log("Something went wrong in the order repository");
      throw { error };
    }
  }

  async getOrder(orderId) {
    try {
      const order = await Order.findById(orderId);
      return order;
    } catch (error) {
      console.log("Something went wrong in the order repository");
      throw { error };
    }
  }
  async updateOrder(id, orderData) {
    try {
      const order = await Order.findByIdAndUpdate(id, orderData);
      return order;
    } catch (error) {
      console.log("Something went wrong in the order repository");
      throw { error };
    }
  }
}

export default OrderRepository;

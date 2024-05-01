import CartRepository from "../repositories/Cart-repository.js";
import ProductRepository from "../repositories/Product-repository.js";

import Cart from "../models/Cart.js";
import { getIdFromMail, getUserFromMail } from "../middlewares/functions.js";
class CartService {
  constructor() {
    this.cartRepository = new CartRepository();

    this.productRepository = new ProductRepository();
  }

  async addCartItem(cartId, productId) {
    try {
      const item = { productId: productId, quantity: 1 };

      const cart = await Cart.findOne({
        _id: cartId,
        "items.productId": productId,
      });
      if (!cart) {
        const updatedCart = await Cart.updateOne(
          { _id: cartId },
          { $push: { items: item } }
        );
        return updatedCart;
      } else if (cart != null) {
        const updatedCart = await Cart.updateOne(
          { _id: cartId, "items.productId": productId },
          { $inc: { "items.$.quantity": 1 } }
        );
        return updatedCart;
      }
    } catch (error) {
      console.log("Something went wrong in the service layer ", error);
      throw error;
    }
  }
  async getTotalProducts(cartId) {
    try {
      const totalProducts = await this.cartRepository.getTotalProducts(cartId);
      return totalProducts;
    } catch (error) {
      console.log("Something went wrong in the service layer ", error);
      throw error;
    }
  }
  async getProducts(cartId) {
    try {
      const products = await this.cartRepository.getProducts(cartId);
      return products;
    } catch (error) {
      console.log("Something went wrong in the service layer ", error);
      throw error;
    }
  }
  async removeProduct(cartId, productId) {
    try {
      const updatedCart = await this.cartRepository.removeProduct(
        cartId,
        productId
      );
      return updatedCart;
    } catch (error) {
      console.log("Something went wrong in the service layer ", error);
      throw error;
    }
  }
  async increaseQuantity(cartId, productId) {
    try {
      const updatedCart = await this.cartRepository.increaseQuantity(
        cartId,
        productId
      );
      return updatedCart;
    } catch (error) {
      console.log("Something went wrong in the service layer ", error);
      throw error;
    }
  }
  async decreaseQuantity(cartId, productId) {
    try {
      const updatedCart = await this.cartRepository.decreaseQuantity(
        cartId,
        productId
      );
      return updatedCart;
    } catch (error) {
      console.log("Something went wrong in the service layer ", error);
      throw error;
    }
  }
  async emptyCart(cartId) {
    try {
      const isEmpty = await this.cartRepository.emptyCart(cartId);
      return isEmpty;
    } catch (error) {
      console.log("Something went wrong in the service layer ", error);
      throw error;
    }
  }
  async getCartID(email) {
    try {
      const userId = await getIdFromMail(email);
      console.log("userId", userId);
      console.log("typeof", typeof userId);

      const cartId = await this.cartRepository.getCID(userId);
      console.log(cartId);
      return cartId;
    } catch (error) {
      console.log("Something went wrong in the service layer ", error);
      throw error;
    }
  }
}

export default CartService;

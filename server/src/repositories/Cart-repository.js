import CrudRepository from "./Crud-repository.js";

import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
class CartRepository extends CrudRepository {
  constructor() {
    super(Cart);
  }
  async getPID(cartId) {
    try {
      const cart = await Cart.findById(cartId);

      return cart;
    } catch {
      console.log("Something went wrong in the cart repository");
      throw { error };
    }
  }
  async getCID(userID) {
    try {
      const cart = await Cart.findOne({ user: userID });

      return cart._id;
    } catch {
      console.log("Something went wrong in the cart repository");
      throw { error };
    }
  }
  async getTotalProducts(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        console.log("Cart not found");
        return 0;
      }
      return cart.items.length;
    } catch (error) {
      console.log("Something went wrong in the cart repository tp");
      throw { error };
    }
  }
  async getProducts(cartId) {
    try {
      const cartItems = [];
      const cart = await Cart.findById(cartId)
        .populate("items.productId")
        .exec();
      if (!cart) {
        console.log("cart not found, returning", cart);
        return cartItems;
      }

      for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (product) {
          cartItems.push({
            product: product,
            quantity: item.quantity,
          });
        }
      }
      return cartItems;
    } catch (error) {
      console.log("Something went wrong in the cart repository");
      throw { error };
    }
  }
  async removeProduct(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        console.log("Cart not found");
        return false;
      }
      const index = cart.items.findIndex((item) => item.productId == productId);
      if (index == -1) {
        console.log("Product not found in the cart");
        return false;
      }
      cart.items.splice(index, 1);
      await cart.save();
      return true;
    } catch (error) {
      console.log("Something went wrong in the cart repository");
      throw { error };
    }
  }
  async increaseQuantity(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        console.log("Cart not found");
        return false;
      }
      const index = cart.items.findIndex((item) => item.productId == productId);

      cart.items[index].quantity += 1;
      await cart.save();

      return true;
    } catch (error) {
      console.log("Something went wrong in the cart repository");
      throw { error };
    }
  }
  async decreaseQuantity(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        console.log("Cart not found");
        return false;
      }
      const index = cart.items.findIndex((item) => item.productId == productId);

      if (cart.items[index].quantity === 1) {
        this.removeProduct(cartId, productId);
      } else {
        cart.items[index].quantity -= 1;
      }
      await cart.save();
      return true;
    } catch (error) {
      console.log("Something went wrong in the cart repository");
      throw { error };
    }
  }
  async getItems(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate("items");
      if (!cart) {
        console.log("Cart not found");
        return 0;
      }
      const items = cart.items;
      return items;
    } catch (error) {
      console.log("Something went wrong in the cart repository");
      throw { error };
    }
  }
  async emptyCart(cartId) {
    try {
      const cart = await Cart.updateOne(
        { _id: cartId },
        { $set: { items: [] } }
      );
      return true;
    } catch (error) {
      console.log("Something went wrong in the cart repository");
      throw { error };
    }
  }
}

export default CartRepository;

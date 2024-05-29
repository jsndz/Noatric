import axios from "axios";

export const addToCart = async (cartId, productId) => {
  try {
    const response = await axios.patch(` /api/v1/carts/${cartId}`, productId);

    return response;
  } catch (error) {
    console.log("Error in adding to cart", error);
  }
};

export const getTotalProducts = async (cartId) => {
  try {
    const response = await axios.get(` /api/v1/carts/${cartId}`);
    return response.data;
  } catch (error) {
    console.log("Error in getting count ", error);
  }
};

export const getAllCartItems = async (cartId) => {
  try {
    const response = await axios.get(` /api/v1/carts/${cartId}/items`);
    return response.data;
  } catch (error) {
    console.log("Error in cart items", error);
  }
};

export const changeCartItem = async (cartId, productId) => {
  try {
    const response = await axios.delete(
      ` /api/v1/carts/${cartId}/product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error in cart items", error);
  }
};

export const increaseQuantity = async (cartId, productId) => {
  try {
    const response = await axios.patch(
      ` /api/v1/carts/${cartId}/product/${productId}/increase`
    );
    return response.data;
  } catch (error) {
    console.log("Error in cart items", error);
  }
};
export const decreaseQuantity = async (cartId, productId) => {
  try {
    const response = await axios.delete(
      ` /api/v1/carts/${cartId}/product/${productId}/decrease`
    );
    return response.data;
  } catch (error) {
    console.log("Error in cart items", error);
  }
};

export const emptyCart = async (cartId) => {
  try {
    const response = await axios.patch(` /api/v1/cart/empty/${cartId}`);
    return response.data;
  } catch (error) {
    console.log("Error in cart items", error);
  }
};

export const getCartId = async () => {
  try {
    const response = await axios.get(` /api/v1/cartId/`);
    return response.data;
  } catch (error) {
    console.log("Error in cart id", error);
  }
};

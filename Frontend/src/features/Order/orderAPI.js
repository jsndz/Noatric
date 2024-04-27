import axios from "axios";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      "https://localhost:3000/api/v1/orders",
      orderData
    );
    return response.data;
  } catch (error) {
    console.log("Error creating order:", error);
    throw error;
  }
};

export const fetchOrder = async () => {
  try {
    const response = await axios.get(`https://localhost:3000/api/v1/orders`);
    return response.data;
  } catch (error) {
    console.log("Error fetching orders:", error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await axios.get(
      `https://localhost:3000/api/v1/orders/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching orders:", error);
    throw error;
  }
};

export const fetchOrderItems = async () => {
  try {
    const response = await axios.get(
      `https://localhost:3000/api/v1/orderItems`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching orders:", error);
    throw error;
  }
};

export const getAllOrders = async ({ sort, pagin }) => {
  const params = new URLSearchParams();
  console.log(sort);
  if (pagin) {
    params.append("_page", pagin.page);
    params.append("_limit", pagin.limit);
    params.append("_order", sort._order);
    params.append("_sort", sort._sort);
  }
  console.log("params", params);
  try {
    const res = await axios.get(`https://localhost:3000/api/v1/allOrder`, {
      params,
    });
    const totalItems = res.headers["x-total-count"];
    const response = { ...res.data, totalItems };
    return response;
  } catch (error) {
    console.log("Error fetching orders:", error);
    throw error;
  }
};
export const getOrderProducts = async (orderId) => {
  try {
    const response = await axios.get(
      `https://localhost:3000/api/v1/orderProducts/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching orders:", error);
    throw error;
  }
};

export const updateOrder = async (updatedOrder) => {
  try {
    const response = await axios.patch(
      `https://localhost:3000/api/v1/orderStatus`,
      updatedOrder
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching orders:", error);
    throw error;
  }
};

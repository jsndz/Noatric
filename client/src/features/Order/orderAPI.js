import axios from "axios";
const baseURL =
  import.meta.env.VITE_ENV === `production`
    ? import.meta.env.VITE_PROD_BASE_URL
    : import.meta.env.VITE_DEV_BASE_URL;
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${baseURL}/api/v1/orders`, orderData);
    return response.data;
  } catch (error) {
    console.log(`Error creating order:`, error);
    throw error;
  }
};

export const fetchOrder = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/orders`);
    return response.data;
  } catch (error) {
    console.log(`Error fetching orders:`, error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.log(`Error fetching orders:`, error);
    throw error;
  }
};

export const fetchOrderItems = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/orders/orderItems`);
    return response.data;
  } catch (error) {
    console.log(`Error fetching orders:`, error);
    throw error;
  }
};

export const getAllOrders = async ({ sort, pagin }) => {
  const params = new URLSearchParams();

  if (pagin) {
    params.append(`_page`, pagin.page);
    params.append(`_limit`, pagin.limit);
    params.append(`_order`, sort._order);
    params.append(`_sort`, sort._sort);
  }
  try {
    const res = await axios.get(`${baseURL}/api/v1/orders/allOrder`, {
      params,
    });
    const totalItems = res.headers[`x-total-count`];
    const response = { ...res.data, totalItems };
    return response;
  } catch (error) {
    console.log(`Error fetching orders:`, error);
    throw error;
  }
};
export const getOrderProducts = async (orderId) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/v1/orders/orderProducts/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching orders:`, error);
    throw error;
  }
};

export const updateOrder = async (updatedOrder) => {
  try {
    const response = await axios.patch(
      `${baseURL}/api/v1/orders/orderStatus`,
      updatedOrder
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching orders:`, error);
    throw error;
  }
};

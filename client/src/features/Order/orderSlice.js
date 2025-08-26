import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  createOrder,
  fetchOrder,
  fetchOrderItems,
  getAllOrders,
  getOrderProducts,
  getOrder,
  updateOrder,
} from "./orderAPI";

const initialState = {
  currentOrderId: null,
  order: [],
  orderItems: [],
  status: "idle",
  error: null,
  AdminOrders: null,
  totalOrders: 0,
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await createOrder(orderData);

      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return thunkAPI.rejectWithValue("Failed to create order");
    }
  }
);

export const fetchOrderAsync = createAsyncThunk(
  "order/fetchOrder",
  async (_, thunkAPI) => {
    try {
      const response = await fetchOrder();
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return thunkAPI.rejectWithValue("Failed to fetch orders");
    }
  }
);

export const getOrderAsync = createAsyncThunk(
  "order/getOrder",
  async (orderId, thunkAPI) => {
    try {
      const response = await getOrder(orderId);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return thunkAPI.rejectWithValue("Failed to fetch orders");
    }
  }
);

export const fetchOrderItemsAsync = createAsyncThunk(
  "order/fetchOrderItems",
  async (_, thunkAPI) => {
    try {
      const response = await fetchOrderItems();
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return thunkAPI.rejectWithValue("Failed to fetch orders");
    }
  }
);

export const getAllOrdersAsync = createAsyncThunk(
  "order/getAllOrders",
  async ({ sort, pagin }, thunkAPI) => {
    try {
      const response = await getAllOrders({ sort, pagin });
      thunkAPI.dispatch(totalOrders(response.totalItems));
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return thunkAPI.rejectWithValue("Failed to fetch orders");
    }
  }
);

export const getOrderProductsAsync = createAsyncThunk(
  "order/getOrderProducts",
  async (orderId, thunkAPI) => {
    try {
      const response = await getOrderProducts(orderId);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return thunkAPI.rejectWithValue("Failed to fetch orders");
    }
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (updatedOrder, thunkAPI) => {
    try {
      const response = await updateOrder(updatedOrder);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return thunkAPI.rejectWithValue("Failed to fetch orders");
    }
  }
);
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    OrSignOut: (state) => {
      state.currentOrderId = null;
      state.order = [];
      state.orderItems = [];
    },
    totalOrders: (state, action) => {
      state.totalOrders = action.payload;
    },
    clearOrder: (state) => {
      state.currentOrder = null;
      state.currentOrderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentOrder = action.payload;
        state.currentOrderId = action.payload.id;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(fetchOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      })
      .addCase(fetchOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(fetchOrderItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderItems = action.payload;
      })
      .addCase(fetchOrderItemsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AdminOrders = action.payload;
      })
      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getOrderProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderItems = action.payload;
      })
      .addCase(getOrderProductsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentOrder = action.payload;
      })
      .addCase(getOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { OrSignOut, totalOrders, clearOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectOrderStatus = (state) => state.order.status;
export const selectOrderError = (state) => state.order.error;
export const selectOrderId = (state) => state.order.currentOrderId;
export const selectOrder = (state) => state.order.order;
export const selectOrderItems = (state) => state.order.orderItems;
export const selectAdminOrders = (state) => state.order.AdminOrders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export default orderSlice.reducer;

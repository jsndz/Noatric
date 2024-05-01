import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getTotalProducts,
  getAllCartItems,
  changeCartItem,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
  getCartId,
} from "./cartAPI";
import { useSelector } from "react-redux";

const initialState = {
  items: [],
  status: "idle",
  cartId: localStorage.getItem("cartId") || null,
  totalProducts: 0,
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ cartId, productId }, thunkAPI) => {
    try {
      const response = await addToCart(cartId, productId);
      thunkAPI.dispatch(getTotalProductsAsync(cartId));
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const getTotalProductsAsync = createAsyncThunk(
  "cart/getTotalProducts",
  async (cartId, thunkAPI) => {
    try {
      const response = await getTotalProducts(cartId);

      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching totalProducts:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const getAllCartItemsAsync = createAsyncThunk(
  "cart/getAllCartItems",
  async (cartId, thunkAPI) => {
    try {
      const response = await getAllCartItems(cartId);
      return response.data;
    } catch (error) {
      console.error("Error fetching totalProducts:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const changeCartItemAsync = createAsyncThunk(
  "cart/changeCartItem",
  async ({ cartId, productId }, thunkAPI) => {
    try {
      const response = await changeCartItem(cartId, productId);
      thunkAPI.dispatch(getAllCartItemsAsync(cartId));
      thunkAPI.dispatch(getTotalProductsAsync(cartId));
      return response.data;
    } catch (error) {
      console.error("Error fetching totalProducts:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const increaseQuantityAsync = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ cartId, productId }, thunkAPI) => {
    try {
      const response = await increaseQuantity(cartId, productId);
      thunkAPI.dispatch(getAllCartItemsAsync(cartId));
      thunkAPI.dispatch(getTotalProductsAsync(cartId));
      return response.data;
    } catch (error) {
      console.error("Error fetching totalProducts:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const decreaseQuantityAsync = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ cartId, productId }, thunkAPI) => {
    try {
      const response = await decreaseQuantity(cartId, productId);
      thunkAPI.dispatch(getAllCartItemsAsync(cartId));
      thunkAPI.dispatch(getTotalProductsAsync(cartId));
      return response.data;
    } catch (error) {
      console.error("Error fetching totalProducts:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const emptyCartAsync = createAsyncThunk(
  "cart/emptyCart",
  async (cartId, thunkAPI) => {
    try {
      const response = await emptyCart(cartId);
      return response.data;
    } catch (error) {
      console.error("Error in  emptying Cart:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const getCartIdAsync = createAsyncThunk(
  "cart/getCartId",
  async (_, thunkAPI) => {
    try {
      const response = await getCartId();
      return response.data;
    } catch (error) {
      console.error("Error in  getting cart id:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    CartSignOut: (state) => {
      state.items = [];
      state.totalProducts = 0;
      state.cartId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getTotalProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTotalProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.totalProducts = action.payload;
      })
      .addCase(getTotalProductsAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(getAllCartItemsAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(changeCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changeCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(changeCartItemAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(increaseQuantityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(increaseQuantityAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(increaseQuantityAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(decreaseQuantityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(decreaseQuantityAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(emptyCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emptyCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      })
      .addCase(emptyCartAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getCartIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartId = action.payload;
      })
      .addCase(getCartIdAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setCartId, CartSignOut } = cartSlice.actions;
export const selectCartId = (state) => state.cart.cartId;
export const selectTotalProducts = (state) => state.cart.totalProducts;
export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;

/* */

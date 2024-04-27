import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
  fetchAllProductsById,
  fetchProductsByFilters,
} from "../Product/productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllProducts();
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);

      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, pagin }, thunkAPI) => {
    try {
      const response = await fetchProductsByFilters(filter, pagin);
      return response;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const fetchProductsByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchAllProductsById(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const editProductAsync = createAsyncThunk(
  "product/editProduct",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await editProduct(id, data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    try {
      const response = await createProduct(data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
export const deleteProductAsync = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await deleteProduct(id);
      return response.data;
    } catch (error) {
      console.error("Error in deleting item:", error);
      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    ProSignOut: (state) => {
      state.products = [];
      state.totalItems = 0;
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByFilterAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(fetchProductsByIdAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProductsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductsByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(editProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(editProductAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { updateProducts, ProSignOut } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProduct = (state) => state.product.selectedProduct;
export default productSlice.reducer;

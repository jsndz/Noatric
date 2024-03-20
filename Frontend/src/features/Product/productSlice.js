import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../Product/productAPI";

const initialState = {
  products: [],
  status: "idle",
};
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (name, thunkAPI) => {
    try {
      const response = await fetchAllProducts();

      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);

      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
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
      });
  },
});
export const {} = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;

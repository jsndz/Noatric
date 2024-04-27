import { fetchAllBrands } from "./productAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
  status: "idle",
};
export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async (name, thunkAPI) => {
    try {
      const response = await fetchAllBrands();
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);

      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    BrandSignOut: (state) => {
      state.brands = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllBrandsAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
export const { BrandSignOut } = brandSlice.actions;
export const selectAllBrands = (state) => state.brand.brands;
export default brandSlice.reducer;

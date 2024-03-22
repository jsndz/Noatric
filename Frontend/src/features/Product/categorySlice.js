import { fetchAllCategories } from "./productAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  Categories: [],
  status: "idle",
};
export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async (name, thunkAPI) => {
    try {
      const response = await fetchAllCategories();
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);

      return thunkAPI.rejectWithValue("Something is wrong with API ");
    }
  }
);

const CategoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Categories = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
export const {} = CategoriesSlice.actions;
export const selectAllCategories = (state) => state.category.Categories;
export default CategoriesSlice.reducer;

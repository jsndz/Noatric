import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/Product/productSlice";
const store = configureStore({
  reducer: {
    product: ProductReducer,
  },
});
export default store;

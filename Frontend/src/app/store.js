import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/Product/productSlice";
import BrandReducer from "../features/Product/brandSlice";
import CategoryReduer from "../features/Product/categorySlice";
const store = configureStore({
  reducer: {
    product: ProductReducer,
    brand: BrandReducer,
    category: CategoryReduer,
  },
});
export default store;

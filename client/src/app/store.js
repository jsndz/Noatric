import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/Product/productSlice";
import BrandReducer from "../features/Product/brandSlice";
import CategoryReducer from "../features/Product/categorySlice";
import CartReducer from "../features/Cart/cartSlice";
import OrderReducer from "../features/Order/orderSlice";
import UserReducer from "../features/auth/authSlice";
const store = configureStore({
  reducer: {
    product: ProductReducer,
    brand: BrandReducer,
    category: CategoryReducer,
    cart: CartReducer,
    order: OrderReducer,
    user: UserReducer,
  },
});
export default store;

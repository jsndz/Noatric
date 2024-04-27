import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/Product/productSlice";
import BrandReducer from "../features/Product/brandSlice";
import CategoryReduer from "../features/Product/categorySlice";
import UserReducer from "../features/auth/authSlice";
import CartReducer from "../features/Cart/cartSlice";
import OrderReducer from "../features/Order/orderSlice";
const store = configureStore({
  reducer: {
    product: ProductReducer,
    brand: BrandReducer,
    category: CategoryReduer,
    user: UserReducer,
    cart: CartReducer,
    order: OrderReducer,
  },
});
export default store;

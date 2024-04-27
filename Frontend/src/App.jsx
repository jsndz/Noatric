import { useState, useEffect } from "react";
import "./App.css";
import ProductList from "./features/Product/component/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { PDetailPage } from "./pages/PDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { getTotalProductsAsync, selectCartId } from "./features/Cart/cartSlice";
import Page404 from "./pages/Page404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserOrderPage from "./pages/UserOrderPage";
import AdminProtected from "./features/auth/components/AdminProtected";
import AdminProductListPage from "./pages/AdminProductListPage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import StripeCheckout from "./pages/StripeCheckout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <Protected>
        <PDetailPage></PDetailPage>
      </Protected>
    ),
  },
  {
    path: "*",
    element: <Page404></Page404>,
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>
      </Protected>
    ),
  },
  {
    path: "/user-profile",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/user-orders",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminProductListPage></AdminProductListPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/details/:id",
    element: (
      <AdminProtected>
        <AdminProductDetailsPage></AdminProductDetailsPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminProtected>
        <AdminOrderPage></AdminOrderPage>
      </AdminProtected>
    ),
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

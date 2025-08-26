import React from "react";
import { ProductDetails } from "../features/Product/component/ProductDetails";
import Navbar from "../features/Navbar/Navbar";
import Footer from "../features/Footer/Footer";

export function PDetailPage() {
  return (
    <div>
      <Navbar></Navbar>
      <ProductDetails></ProductDetails>
      <Footer></Footer>
    </div>
  );
}

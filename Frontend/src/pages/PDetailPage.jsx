import React from "react";
import { ProductDetails } from "../features/Product/component/ProductDetails";
import Navbar from "../features/Navbar/Navbar";

export function PDetailPage() {
  return (
    <div>
      <Navbar></Navbar>
      <ProductDetails></ProductDetails>
    </div>
  );
}

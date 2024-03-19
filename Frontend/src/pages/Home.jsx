import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/Product/component/ProductList";

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <ProductList></ProductList>
    </div>
  );
}

export default Home;

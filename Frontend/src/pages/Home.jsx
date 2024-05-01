import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/Product/component/ProductList";
import Footer from "../features/Footer/Footer";
import Cookies from "js-cookie";

const allCookies = Cookies.get();
console.log(allCookies);
function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <ProductList></ProductList>
      <Footer></Footer>
    </div>
  );
}

export default Home;

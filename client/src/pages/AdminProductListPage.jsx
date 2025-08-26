import React from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminProductList from "../features/admin/AdminProductList";
import Footer from "../features/Footer/Footer";
function AdminProductListPage() {
  return (
    <div>
      <Navbar></Navbar>
      <AdminProductList></AdminProductList>
      <Footer></Footer>
    </div>
  );
}

export default AdminProductListPage;

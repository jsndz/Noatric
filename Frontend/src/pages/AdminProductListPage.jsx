import React from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminProductList from "../features/admin/AdminProductList";

function AdminProductListPage() {
  return (
    <div>
      <Navbar></Navbar>
      <AdminProductList></AdminProductList>
    </div>
  );
}

export default AdminProductListPage;

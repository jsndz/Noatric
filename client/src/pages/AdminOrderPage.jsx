import React from "react";
import AdminOrderManagement from "../features/admin/AdminOrderManagement";
import Navbar from "../features/Navbar/Navbar";

function AdminOrderPage() {
  return (
    <div>
      <Navbar></Navbar>
      <AdminOrderManagement></AdminOrderManagement>
    </div>
  );
}

export default AdminOrderPage;

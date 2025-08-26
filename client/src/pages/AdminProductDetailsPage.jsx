import React from "react";
import { AdminProductDetails } from "../features/admin/AdminProductDetails";
import Navbar from "../features/Navbar/Navbar";

function AdminProductDetailsPage() {
  return (
    <div>
      <Navbar></Navbar>
      <AdminProductDetails></AdminProductDetails>
    </div>
  );
}

export default AdminProductDetailsPage;

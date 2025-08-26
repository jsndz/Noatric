import React from "react";
import UserOrders from "../features/User/UserOrders";
import Navbar from "../features/Navbar/Navbar";

function UserOrderPage() {
  return (
    <div>
      <Navbar></Navbar>
      <UserOrders></UserOrders>
    </div>
  );
}

export default UserOrderPage;

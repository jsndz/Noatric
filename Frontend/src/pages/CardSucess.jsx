import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCartAsync } from "../features/Cart/cartSlice";
import { selectOrderId } from "../features/Order/orderSlice";
function CardSucess() {
  const dispatch = useDispatch();
  const orderId = useSelector(selectOrderId);
  if (orderId !== null) {
    console.log(orderId);
  }
  useEffect(() => {}, []);
  return (
    <div>
      <p>Order Placed Succesfully</p>
      <Link
        to="/"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Go back home
      </Link>
    </div>
  );
}

export default CardSucess;

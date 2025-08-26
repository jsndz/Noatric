import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectOrderId } from "../features/Order/orderSlice";
import Button from "../features/Landing/components/Button";
import Navbar from "../features/Navbar/Navbar";
function CardSucess() {
  const dispatch = useDispatch();
  const orderId = useSelector(selectOrderId);

  useEffect(() => {}, []);
  return (
    <>
      <Navbar></Navbar>
      <main className="grid min-h-full place-items-center mt-10 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-color-1">
            Order Successfully Placed
          </p>

          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in
            <span className="block"> {`>>Profile >>Your Orders`}</span>
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button to="/" className="border border-color-5 rounded-lg">
              Go back home
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default CardSucess;

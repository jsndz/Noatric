import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCartItemsAsync,
  selectItems,
  selectCartId,
  changeCartItemAsync,
  increaseQuantityAsync,
  decreaseQuantityAsync,
} from "./cartSlice";
import Button from "../Landing/components/Button";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { clearOrder } from "../Order/orderSlice";
import cart from "../../assets/cart.png";
import Heading from "../Landing/components/Heading";
import TagLine from "../Landing/components/Tagline";
export function Cart() {
  const [open, setOpen] = useState(true);
  const cartId = useSelector(selectCartId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCartItemsAsync(cartId));
  }, [dispatch, cartId]);
  useEffect(() => {
    dispatch(clearOrder());
  }, []);
  const products = useSelector(selectItems);

  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => {
      return (
        total +
        Math.round(
          product?.product?.price *
            (1 - product?.product?.discountPercentage / 100)
        ) *
          product.quantity
      );
    }, 0);
  }, [products]);

  const handleRemove = (productId) => {
    dispatch(changeCartItemAsync({ cartId, productId }));
  };

  const handleIncrease = (productId) => {
    dispatch(increaseQuantityAsync({ cartId, productId }));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantityAsync({ cartId, productId }));
  };

  const handleCheckout = () => {
    const outOfStockProducts = products.filter(
      (product) => product.quantity > product.product.stock
    );

    if (outOfStockProducts.length > 0) {
      alert(
        `These products are out of stock. Please remove or update the quantities: ${outOfStockProducts.map(
          (product) => product.product.title
        )}`
      );
    } else {
      // return <Navigate to="/checkout" />;
      navigate("/checkout");
    }
  };

  return (
    <>
      {products && products.length > 0 ? (
        <div className="mx-auto mt-12 pt-12 max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="pb-6">
            <TagLine className={`pb-10 text-xl`}>Cart</TagLine>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-black">
                {products.map((product, index) => (
                  <li key={index} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={product?.product?.thumbnail}
                        alt={product?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div
                          className="flex justify-between text-base font-medium"
                          style={{ color: "#FFFFFF" }}
                        >
                          <h3>
                            <a href={product?.href}>
                              {product?.product?.title}
                            </a>
                          </h3>
                          <p className="text-sm block font-medium">
                            $
                            {product?.product &&
                              Math.round(
                                product?.product?.price *
                                  (1 -
                                    product?.product?.discountPercentage / 100)
                              )}
                          </p>
                          <p> Stock Left: {product?.product?.stock}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleIncrease(product?.product?.id)}
                            type="button"
                            className="px-2 py-1 mr-1 rounded-md bg-neutral-3 text-neutral-6 hover:bg-color-5"
                          >
                            +
                          </button>
                          <p className="text-neutral-2 text-color-5">
                            Qty {product.quantity}
                          </p>
                          <button
                            onClick={() => handleDecrease(product?.product?.id)}
                            type="button"
                            className="px-2 py-1 ml-1 rounded-md bg-neutral-3 text-neutral-6 hover:bg-color-5"
                          >
                            -
                          </button>
                        </div>
                        <div className="flex">
                          <button
                            onClick={() => handleRemove(product?.product?.id)}
                            type="button"
                            className="font-medium hover:text-indigo-500"
                            style={{ color: "#FF776F" }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="border-t px-4  py-6 sm:px-6"
            style={{ borderColor: "#FFFFFF" }}
          >
            <div
              className="flex justify-between text-base font-medium"
              style={{ color: "#FFFFFF" }}
            >
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm" style={{ color: "#CAC6DD" }}>
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Button
                className="button relative inline-flex items-center justify-center border rounded-md border-color-1 h-11 transition-colors hover:text-color-1 "
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm">
              <p style={{ color: "#CAC6DD" }}>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping <span aria-hidden="true">&rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto  mt-24 pt-12  max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex ">
            {" "}
            <div>
              <img src={cart} width={500} alt="Noatric" />
            </div>
            <div className=" justify-center pl-40  pt-44">
              {/* <h2 className="text-xl font-medium text-white">
                No items in cart
              </h2> */}
              <Heading
                tag="No items in cart"
                title={
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping <span aria-hidden="true">&rarr;</span>
                    </button>
                  </Link>
                }
              ></Heading>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

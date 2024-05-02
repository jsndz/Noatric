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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { clearOrder } from "../Order/orderSlice";

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
      {products && (
        <div className="mx-auto bg-black mt-12  max-w-7xl px-2 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-xl font-medium text-white">Cart</h2>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product, index) => (
                  <li key={index} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product?.product?.thumbnail}
                        alt={product?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product?.href}>
                              {product?.product?.title}
                            </a>
                          </h3>
                          <p className="text-sm block font-medium text-gray-900">
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
                        <button
                          onClick={() => handleIncrease(product?.product?.id)}
                          type="button"
                          className="px-1 py-1 mr-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                        >
                          +
                        </button>
                        <p className="text-gray-500">Qty {product.quantity}</p>
                        <button
                          onClick={() => handleDecrease(product?.product?.id)}
                          type="button"
                          className="px-1 py-1 ml-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                        >
                          -
                        </button>
                        <div className="flex">
                          <button
                            onClick={() => handleRemove(product?.product?.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
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

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
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
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderProductsAsync,
  selectAdminOrders,
  selectOrderItems,
} from "../Order/orderSlice";
import TagLine from "../Landing/components/Tagline";
function ViewOrders({ order }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderProductsAsync(order.id));
  }, [dispatch, order.id]);

  const products = useSelector(selectOrderItems);

  return (
    <div className="min-h-screen p-6  flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-gray-900 p-20 rounded-md text-white">
          {order && (
            <div>
              <TagLine className="text-lg font-semibold mb-4">
                Order Details
              </TagLine>
              <p className="mb-2">
                <strong>ID:</strong> {order.id}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="mb-2">
                <strong>Total Items:</strong> {order.totalItems}
              </p>
              <p className="mb-2">
                <strong>Total Amount:</strong> ${order.totalAmount}
              </p>
              <p className="mb-2">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p className="mb-2">
                <strong>Selected Address:</strong>
              </p>
              {order.selectedAddress && (
                <div className="pl-4">
                  <p className="mb-1">Name: {order.selectedAddress.name}</p>
                  <p className="mb-1">Email: {order.selectedAddress.email}</p>
                  <p className="mb-1">
                    Country: {order.selectedAddress.country}
                  </p>
                  <p className="mb-1">
                    Street Address: {order.selectedAddress["street-address"]}
                  </p>
                  <p className="mb-1">City: {order.selectedAddress.city}</p>
                </div>
              )}
            </div>
          )}
          <ul>
            {products &&
              products.map((product, index) => (
                <li key={index} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    {product.product && product.product.thumbnail && (
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-100">
                        <h3>
                          <a
                            href={product.product ? product.product.href : "#"}
                            className="hover:underline"
                          >
                            {product.product
                              ? product.product.title
                              : "Product Title"}
                          </a>
                        </h3>
                        <p className="text-sm block font-medium text-gray-100">
                          $
                          {product.product &&
                            Math.round(
                              product.product.price *
                                (1 - product.product.discountPercentage / 100)
                            )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-400">Qty {product.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewOrders;

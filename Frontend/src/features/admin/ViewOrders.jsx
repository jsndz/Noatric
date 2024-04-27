import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderProductsAsync,
  selectAdminOrders,
  selectOrderItems,
} from "../Order/orderSlice";

function ViewOrders({ order }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderProductsAsync(order.id));
  }, [dispatch, order.id]);

  const products = useSelector(selectOrderItems);
  console.log("products", products);

  return (
    <div>
      <h1>My Order</h1>
      {order && (
        <div>
          <h2>Order Details</h2>
          <p>
            <strong>ID:</strong> {order.id}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total Items:</strong> {order.totalItems}
          </p>
          <p>
            <strong>Total Amount:</strong> ${order.totalAmount}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Selected Address:</strong>
          </p>
          {order.selectedAddress && (
            <>
              <p>Name: {order.selectedAddress.name}</p>
              <p>Email: {order.selectedAddress.email}</p>
              <p>Country: {order.selectedAddress.country}</p>
              <p>Street Address: {order.selectedAddress["street-address"]}</p>
              <p>City: {order.selectedAddress.city}</p>
              {/* Add additional address fields as needed */}
            </>
          )}
        </div>
      )}
      <div>
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
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      {/* Added conditional check */}
                      <a href={product.product ? product.product.href : "#"}>
                        {product.product
                          ? product.product.title
                          : "Product Title"}
                      </a>
                    </h3>
                    <p className="text-sm  block font-medium text-gray-900">
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
                  <p className="text-gray-500">Qty {product.quantity}</p>
                </div>
              </div>
            </li>
          ))}
      </div>
    </div>
  );
}

export default ViewOrders;

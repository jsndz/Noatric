import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderAsync,
  selectOrder,
  fetchOrderItemsAsync,
  selectOrderItems,
} from "../Order/orderSlice";
import { fetchAllProductsById } from "../Product/productAPI";
import TagLine from "../Landing/components/Tagline";

function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder);

  useEffect(() => {
    dispatch(fetchOrderAsync());
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <TagLine className="text-3xl font-semibold my-16">My Orders</TagLine>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await Promise.all(
        order.items.map((item) => fetchAllProductsById(item.productId))
      );
      setProducts(productData.map((res) => res.data));
    };

    fetchProducts();
  }, [order.items]);

  return (
    <div className="border border-gray-700 shadow-lg rounded-lg p-6 my-8 bg-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Order Details</h2>
        <span className="text-gray-400">ID: {order.id}</span>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-400">
          <p>
            <span className="font-medium text-gray-300">Status:</span>{" "}
            {order.status}
          </p>
          <p>
            <span className="font-medium text-gray-300">Total Items:</span>{" "}
            {order.totalItems}
          </p>
          <p>
            <span className="font-medium text-gray-300">Total Amount:</span> $
            {order.totalAmount}
          </p>
          <p>
            <span className="font-medium text-gray-300">Payment Method:</span>{" "}
            {order.paymentMethod}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-300 mb-2">
          Selected Address
        </h3>
        {order.selectedAddress ? (
          <div className="bg-gray-800 p-4 rounded-lg shadow-inner text-gray-400">
            <p>
              <span className="font-medium text-gray-300">Name:</span>{" "}
              {order.selectedAddress.name}
            </p>
            <p>
              <span className="font-medium text-gray-300">Email:</span>{" "}
              {order.selectedAddress.email}
            </p>
            <p>
              <span className="font-medium text-gray-300">Country:</span>{" "}
              {order.selectedAddress.country}
            </p>
            <p>
              <span className="font-medium text-gray-300">Street Address:</span>{" "}
              {order.selectedAddress["street-address"]}
            </p>
            <p>
              <span className="font-medium text-gray-300">City:</span>{" "}
              {order.selectedAddress.city}
            </p>
          </div>
        ) : (
          <p className="text-gray-400">No address selected</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Products</h3>
        <ul className="list-disc ml-8 space-y-2 text-gray-400">
          {products.map((product) => (
            <li key={product.id}>
              <ProductDetails product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProductDetails({ product }) {
  return (
    <div className="ml-4">
      <p className="font-semibold">{product.title}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export default UserOrders;

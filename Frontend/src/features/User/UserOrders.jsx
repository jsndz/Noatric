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
    <div className="border border-color-1 rounded-lg p-6 my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order Details</h2>
        <span className="text-gray-600">ID: {order.id}</span>
      </div>
      <p>Status: {order.status}</p>
      <p>Total Items: {order.totalItems}</p>
      <p>Total Amount: ${order.totalAmount}</p>
      <p>Payment Method: {order.paymentMethod}</p>
      <p>Selected Address:</p>
      {order.selectedAddress && (
        <div className="ml-4">
          <p>Name: {order.selectedAddress.name}</p>
          <p>Email: {order.selectedAddress.email}</p>
          <p>Country: {order.selectedAddress.country}</p>
          <p>Street Address: {order.selectedAddress["street-address"]}</p>
          <p>City: {order.selectedAddress.city}</p>
        </div>
      )}
      <h2 className="mt-4 text-xl font-semibold">Products</h2>
      <ul className="list-disc ml-8">
        {products.map((product) => (
          <li key={product.id}>
            <ProductDetails product={product} />
          </li>
        ))}
      </ul>
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

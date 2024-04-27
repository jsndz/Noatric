import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderAsync,
  selectOrder,
  fetchOrderItemsAsync,
  selectOrderItems,
} from "../Order/orderSlice";
import { fetchAllProductsById } from "../Product/productAPI";

function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder);

  useEffect(() => {
    dispatch(fetchOrderAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>My Orders</h1>
      <div className=" m-10 ">
        {orders.map((order) => (
          <div key={order.id} className="border m-10 border-gray-300">
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
              </>
            )}
            <h2>Products</h2>
            <ul>
              {order.items.map((product) => (
                <li key={product.productId}>
                  <ProductDetails productId={product.productId} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchAllProductsById(productId);

        setProduct(productData.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        // Handle error gracefully
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      {product && (
        <div>
          <p>Product Name: {product.title}</p>
          <p>Price: {product.price}</p>
          {/* Add additional product details as needed */}
        </div>
      )}
    </div>
  );
}

export default UserOrders;

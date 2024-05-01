import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAsync,
  selectAdminOrders,
  getOrderProductsAsync,
  selectTotalOrders,
  updateOrderAsync,
} from "../Order/orderSlice";
import {
  EyeIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import ViewOrders from "./ViewOrders";
import { ITEMS_PER_PAGE } from "../../app/constants";
function AdminOrderManagement() {
  const dispatch = useDispatch();
  const [showOrder, setShowOrder] = useState(false);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  // const [isEditable, setIsEditable] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const handleShow = (order) => {
    setSelectedOrder(order);
    setShowOrder(!showOrder);
  };
  const handleOrderStatus = async (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    await dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handlePagination = (page) => {
    setPage(page);
  };
  // const handleEdit = (order) => {
  //   setIsEditable(!isEditable);
  // };
  const handleSort = (sortOption) => {
    const newSort = { _sort: sortOption.sort, _order: sortOption.order };

    setSort(newSort);
  };

  const orders = useSelector(selectAdminOrders);
  const totalItems = useSelector(selectTotalOrders);
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  useEffect(() => {
    const pagin = { page: page, limit: ITEMS_PER_PAGE };
    dispatch(getAllOrdersAsync({ sort, pagin }));
  }, [dispatch, editableOrderId, page, sort]);
  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-left cursor-pointer">
                    Order#
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>

                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Shipping Address</th>
                  <th className="py-3 px-0 text-center">Order Status</th>
                  <th className="py-3 px-0 text-center">Payment Method</th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "createdAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order Time{" "}
                    {sort._sort === "createdAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-3 px-0 text-left cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "updatedAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Last Updated{" "}
                    {sort._sort === "updatedAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders &&
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-0 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="">
                          <div>
                            <strong>{order.selectedAddress.name}</strong>,
                          </div>
                          <div>{order.selectedAddress.city},</div>
                          <div>{order.selectedAddress.country}, </div>
                          <div>{order.selectedAddress.region}, </div>
                          <div>{order.selectedAddress["postal-code"]}, </div>
                          <div>{order.selectedAddress["street-address"]}, </div>
                        </div>
                      </td>
                      {/* <td className="py-3 px-0 text-center">
                        {isEditable && order.id === editableOrderId ? (
                          <select onChange={(e) => handleOrderStatus(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td> */}
                      <td className="py-3 px-0 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleOrderStatus(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.paymentMethod}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : null}
                        </div>
                      </td>

                      <td className="py-3 px-0 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                            <EyeIcon
                              className="w-8 h-8"
                              onClick={(e) => handleShow(order)}
                            ></EyeIcon>
                          </div>
                          <div className="w-6 mr-2 transform hover:text-green-500 hover:scale-120">
                            <PencilIcon
                              className="w-8 h-8"
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {selectedOrder && showOrder && <ViewOrders order={selectedOrder} />}
        </div>
      </div>
      <Pagination
        page={page}
        handlePagination={handlePagination}
        setPage={setPage}
        totalItems={totalItems}
      ></Pagination>
    </div>
  );
}

function Pagination({ page, handlePagination, setPage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={
            page > 1
              ? () => handlePagination(page - 1)
              : () => handlePagination(1)
          }
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={
            page < totalPages
              ? () => handlePagination(page + 1)
              : () => handlePagination(totalPages)
          }
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to <span className="font-medium">{page * ITEMS_PER_PAGE}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
              (el, index) => (
                <div
                  key={index}
                  onClick={(e) => handlePagination(index + 1)}
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center ${
                    index + 1 == page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400"
                  }  px-4 py-2 text-sm font-semibold
                    focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              )
            )}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default AdminOrderManagement;

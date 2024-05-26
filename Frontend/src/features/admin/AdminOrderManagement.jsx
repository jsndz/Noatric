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
import Modal from "../modal/Modal";
function AdminOrderManagement() {
  const dispatch = useDispatch();
  const [showOrder, setShowOrder] = useState(false);
  const [editableOrderId, setEditableOrderId] = useState(-1);
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
    <div className="overflow-x-auto mt-10">
      <div className="bg-gray-900 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="shadow-md rounded-lg my-6 overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-700 text-white uppercase text-xs md:text-sm leading-normal">
                  <th className="py-2 md:py-3 px-2 md:px-4 text-left cursor-pointer">
                    Order#
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-2 md:py-3 px-2 md:px-4 text-left cursor-pointer"
                    onClick={() =>
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
                  <th className="py-2 md:py-3 px-2 md:px-4 text-center">
                    Shipping Address
                  </th>
                  <th className="py-2 md:py-3 px-2 md:px-4 text-center">
                    Order Status
                  </th>
                  <th className="py-2 md:py-3 px-2 md:px-4 text-center">
                    Payment Method
                  </th>
                  <th
                    className="py-2 md:py-3 px-2 md:px-4 text-left cursor-pointer"
                    onClick={() =>
                      handleSort({
                        sort: "createdAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order Time
                    {sort._sort === "createdAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th
                    className="py-2 md:py-3 px-2 md:px-4 text-left cursor-pointer"
                    onClick={() =>
                      handleSort({
                        sort: "updatedAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Last Updated
                    {sort._sort === "updatedAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-2 md:py-3 px-2 md:px-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-300 text-xs md:text-sm font-light">
                {orders &&
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-800 hover:bg-gray-700"
                    >
                      <td className="py-2 md:py-3 px-2 md:px-4 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                        <div className="flex flex-col">
                          <strong>{order.selectedAddress.name}</strong>
                          <span>{order.selectedAddress.city}</span>
                          <span>{order.selectedAddress.country}</span>
                          <span>{order.selectedAddress.region}</span>
                          <span>{order.selectedAddress["postal-code"]}</span>
                          <span>{order.selectedAddress["street-address"]}</span>
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            className="bg-gray-700 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => handleOrderStatus(e, order)}
                          >
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
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                        <div className="flex items-center justify-center">
                          {order.paymentMethod}
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                        <div className="flex items-center justify-center">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                        <div className="flex items-center justify-center">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : null}
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                            <EyeIcon
                              className="w-8 h-8"
                              onClick={() => handleShow(order)}
                            ></EyeIcon>
                          </div>
                          <div className="w-6 mr-2 transform hover:text-green-500 hover:scale-120">
                            <PencilIcon
                              className="w-8 h-8"
                              onClick={() => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {selectedOrder && showOrder && (
            <Modal
              onClose={() => {
                setShowOrder(false);
              }}
            >
              <ViewOrders order={selectedOrder} />
            </Modal>
          )}
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
    <div className="flex items-center justify-between border-t border-n-10 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={
            page > 1
              ? () => handlePagination(page - 1)
              : () => handlePagination(1)
          }
          className="relative inline-flex items-center rounded-md border border-n-6 bg-n-7 px-4 py-2 text-sm font-medium text-n-2 hover:bg-n-9 hover:text-n-1"
        >
          Previous
        </div>
        <div
          onClick={
            page < totalPages
              ? () => handlePagination(page + 1)
              : () => handlePagination(totalPages)
          }
          className="relative ml-3 inline-flex items-center rounded-md border border-n-6 bg-n-7 px-4 py-2 text-sm font-medium text-n-2 hover:bg-n-9 hover:text-n-1"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-n-2">
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
              onClick={
                page > 1
                  ? () => handlePagination(page - 1)
                  : () => handlePagination(1)
              }
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-n-3 ring-1 ring-inset ring-n-6 bg-n-7 hover:bg-n-9 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={() => handlePagination(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-color-5 rounded-md text-n-1"
                    : "text-n-3"
                }  px-4 py-2 text-sm font-semibold
              focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-color-1 cursor-pointer`}
              >
                {index + 1}
              </div>
            ))}

            <button
              onClick={
                page < totalPages
                  ? () => handlePagination(page + 1)
                  : () => handlePagination(totalPages)
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-n-3 ring-1 ring-inset ring-n-6 bg-n-7 hover:bg-n-9 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default AdminOrderManagement;

import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import {
  emptyCartAsync,
  getAllCartItemsAsync,
  selectCartId,
  selectItems,
} from "../Cart/cartSlice";
import {
  addAddressAsync,
  getAddressesAsync,
  selectAddress,
} from "../auth/authSlice";
import {
  createOrderAsync,
  getOrderAsync,
  selectCurrentOrder,
  selectOrderId,
  clearOrder,
} from "../Order/orderSlice";
import Modal from "../modal/Modal";
import TagLine from "../Landing/components/Tagline";
import Button from "../Landing/components/Button";
export function Checkout() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [addressForm, setAddressForm] = useState(false);
  const cartId = useSelector(selectCartId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCartItemsAsync(cartId));
    dispatch(getAddressesAsync());
    dispatch(clearOrder());
  }, [dispatch, cartId]);

  const products = useSelector(selectItems);
  const addresses = useSelector(selectAddress);

  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => {
      return (
        total +
        Math.round(
          product.product.price * (1 - product.product.discountPercentage / 100)
        ) *
          product.quantity
      );
    }, 0);
  }, [products]);
  const totalItems = useMemo(() => {
    return products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  }, [products]);
  const orderData = {
    selectedAddress: selectedAddress,
    paymentMethod: paymentMethod,
    totalAmount: totalPrice,
    totalItems: totalItems,
  };
  const orderId = useSelector(selectOrderId);
  const currentOrder = useSelector(selectCurrentOrder);
  const handleOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address before placing the order.");
      return;
    }
    await dispatch(emptyCartAsync(cartId));

    dispatch(createOrderAsync(orderData));
  };
  const handleAddressForm = async () => {
    setAddressForm(true);
  };

  return (
    <div className="flex justify-center md:flex-col md:w-full lg:flex-row flex-col pt-6">
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout`} />
      )}

      <div className="relative w-full md:w-full  pt-6 mr-6 md:max-w-5xl xl:mb-24">
        <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient border border-color-5">
          <div className="relative bg-n-8 rounded-[1rem]">
            <div className=" bg-n-10 rounded-t-[0.9rem]" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-full flex-col shadow-xl max-w-full">
                <div className="flex-1  px-4 py-6 sm:px-6">
                  {/* Shopping Cart Content */}
                  <div className="flex items-start justify-between">
                    <TagLine className="text-4xl font-bold tracking-tight text-n-1">
                      Checkout
                    </TagLine>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-n-4 hover:text-n-1"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        {/* XMarkIcon component or its equivalent */}
                      </button>
                    </div>
                  </div>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-n-5">
                        {products &&
                          products.map((product, index) => (
                            <li key={index} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-n-5">
                                <img
                                  src={product.product.thumbnail}
                                  alt={product.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-n-1">
                                    <h3>
                                      <a href={product.href}>
                                        {product.product.title}
                                      </a>
                                    </h3>
                                    <p className="text-sm block font-medium text-n-1">
                                      $
                                      {product.product &&
                                        Math.round(
                                          product.product.price *
                                            (1 -
                                              product.product
                                                .discountPercentage /
                                                100)
                                        )}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-n-3">
                                    Qty {product.quantity}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-n-5 px-4 py-6 sm:px-6">
                  {/* Order Summary */}
                  <div className="flex justify-between text-base font-medium text-n-1">
                    <p>Subtotal</p>
                    <p>${totalPrice}</p>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <button
                      onClick={() => {
                        handleOrder();
                      }}
                      className="flex items-center justify-center rounded-md border border-transparent bg-color-1 px-6 py-3 text-base font-medium text-n-1 shadow-sm hover:bg-color-2"
                    >
                      Order Now
                    </button>
                    <p className="text-sm text-n-3">
                      or{"   "}
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-color-1 hover:text-color-2"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <div className="relative   mt-6 md:mt-0 p-4 border border-color-5 rounded-lg ">
        <AddressListing
          addresses={addresses}
          setSelectedAddress={setSelectedAddress}
          handleAddressForm={handleAddressForm}
        />
        {/* Payments */}
        <Payments
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>
      {addressForm && (
        <Modal onClose={() => setAddressForm(false)}>
          <AddressFormat
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            dispatch={dispatch}
            setAddressForm={setAddressForm}
          />
        </Modal>
      )}
    </div>
  );
}

const AddressListing = ({
  addresses,
  setSelectedAddress,
  handleAddressForm,
}) => {
  return addresses.length !== 0 ? (
    <div>
      <div className="border-b rounded-md border-gray-300 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-100">
          Select Your Address
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Choose from Existing addresses
        </p>
        <ul role="list">
          {addresses &&
            addresses.map((address, index) => (
              <li
                key={index}
                className="flex items-center gap-x-6 px-5 py-5 border-solid border-2 border-gray-500 bg-gray-800 rounded-md"
              >
                <div>
                  <input
                    onClick={() => {
                      setSelectedAddress(address);
                    }}
                    name="address"
                    type="radio"
                    className="h-4 w-4 bg-black border-gray-600 text-gray-100 focus:ring-gray-100 focus:bg-black"
                  />
                </div>
                <p className="text-sm font-semibold leading-6 text-gray-100">
                  {address.name}
                </p>
                {/* <div className="flex flex-wrap items-center gap-x-4"> */}
                <p className="text-sm leading-6 text-gray-100">
                  {address["street-address"]}
                </p>
              </li>
            ))}
        </ul>

        <Button
          className="rounded-md mt-4 bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
          onClick={handleAddressForm}
        >
          New Address
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-100">
        Addresses
      </h2>
      <p className="text-sm leading-6 text-gray-400">
        Your List of Address is empty. Add your address
      </p>
      <button
        className="rounded-md mt-4 bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100"
        onClick={handleAddressForm}
      >
        New Address
      </button>
    </div>
  );
};

const Payments = ({ setPaymentMethod, paymentMethod }) => {
  return (
    <div>
      <div className="border-b border-gray-300 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-100">
          Select Payment Method
        </h2>
        <div className="mt-1 space-y-10">
          <div className="mt-2 space-y-3">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  onChange={() => {
                    setPaymentMethod("cash");
                  }}
                  checked={paymentMethod === "cash"}
                  id="payment-cash"
                  name="payment"
                  type="radio"
                  className="h-4 w-4 bg-black border-gray-600 text-gray-100 focus:ring-gray-100 focus:bg-black"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="payment-cash"
                  className="font-medium text-gray-100"
                >
                  Cash
                </label>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  onChange={() => {
                    setPaymentMethod("card");
                  }}
                  id="payment-card"
                  name="payment"
                  type="radio"
                  checked={paymentMethod === "card"}
                  className="h-4 w-4 bg-black border-gray-600 text-gray-100 focus:ring-gray-100 focus:bg-black"
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor="payment-card"
                  className="font-medium text-gray-100"
                >
                  Card
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddressFormat = ({
  register,
  errors,
  handleSubmit,
  dispatch,
  setAddressForm,
}) => {
  return (
    <form
      noValidate
      className="lg:w-3/4"
      onSubmit={handleSubmit((data) => {
        dispatch(addAddressAsync(data));
        setAddressForm(false);
      })}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 w-120 lg:grid-cols-4">
        <div className="flex justify-end lg:col-span-3">
          <div className="space-y-12">
            <div className="border-b border-n-11 pb-12">
              <h2 className="text-base font-semibold leading-7 text-n-1">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-n-3">
                Use a permanent address where you can receive mail.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-n-1"
                  >
                    Full name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("name", {
                        required: "Name is Required",
                      })}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 bg-gray-400 text-n-1 shadow-sm ring-1 ring-inset ring-n-6 placeholder:text-n-3 focus:ring-2 focus:ring-inset focus:ring-color-1 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-n-1"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is Required",
                      })}
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-gray-400 border-0 py-1.5 text-n-1 shadow-sm ring-1 ring-inset ring-n-6 placeholder:text-n-3 focus:ring-2 focus:ring-inset focus:ring-color-1 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm  font-medium leading-6 text-n-1"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="country"
                      {...register("country", {
                        required: "Country is Required",
                      })}
                      name="country"
                      autoComplete="country-name"
                      className="block w-full rounded-md bg-gray-400 border-0 py-1.5 text-n-1 shadow-sm ring-1 ring-inset ring-n-6 focus:ring-2 focus:ring-inset focus:ring-color-1 sm:max-w-xs sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-n-1"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("street-address", {
                        required: "Street address is Required",
                      })}
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full bg-gray-400 rounded-md border-0 py-1.5 text-n-1 shadow-sm ring-1 ring-inset ring-n-6 placeholder:text-n-3 focus:ring-2 focus:ring-inset focus:ring-color-1 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-n-1"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("city", {
                        required: "City is Required",
                      })}
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full bg-gray-400 rounded-md border-0 py-1.5 text-n-1 shadow-sm ring-1 ring-inset ring-n-6 placeholder:text-n-3 focus:ring-2 focus:ring-inset focus:ring-color-1 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-n-1"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("region", {
                        required: "Region is Required",
                      })}
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full bg-gray-400 rounded-md border-0 py-1.5 text-n-1 shadow-sm ring-1 ring-inset ring-n-6 placeholder:text-n-3 focus:ring-2 focus:ring-inset focus:ring-color-1 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-n-1"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("postal-code", {
                        required: "Postal code is Required",
                      })}
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full bg-gray-400 rounded-md border-0 py-1.5 text-n-1 shadow-sm ring-1 ring-inset ring-n-6 placeholder:text-n-3 focus:ring-2 focus:ring-inset focus:ring-color-1 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="reset"
                className="text-sm font-semibold leading-6 text-n-1"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-color-1 px-3 py-2 text-sm font-semibold text-n-1 shadow-sm hover:bg-color-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-1"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

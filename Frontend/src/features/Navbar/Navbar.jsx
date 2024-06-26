import React, { useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Logo from "/noatric-removebg.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartIdAsync,
  getTotalProductsAsync,
  selectCartId,
  selectTotalProducts,
} from "../Cart/cartSlice";
import user from "../../assets/account.png";
import {
  AuthSignOut,
  getUserInfoAsync,
  selectUserInfo,
} from "../auth/authSlice";
import { CartSignOut } from "../Cart/cartSlice";
import { CatSignOut } from "../Product/categorySlice";
import { ProSignOut } from "../Product/productSlice";
import { BrandSignOut } from "../Product/brandSlice";
import { OrSignOut } from "../Order/orderSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function Navbar() {
  const totalProducts = useSelector(selectTotalProducts);
  const cartId = useSelector(selectCartId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartIdAsync());
  }, []);
  useEffect(() => {
    dispatch(getTotalProductsAsync(cartId));
    dispatch(getUserInfoAsync());
  }, [cartId, totalProducts]);
  const userInfo = useSelector(selectUserInfo);

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 w-full bg-n-8/90 border-b border-n-6 backdrop-blur-sm z-10"
    >
      {({ open }) => (
        <>
          <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link
                  to="/"
                  className="block w-[12rem] sm:left-0 xl:mr-8"
                  href="#hero"
                >
                  <img src={Logo} width={190} height={40} alt="Noatric" />
                </Link>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link to="/cart">
                  <button
                    type="button"
                    className="relative   text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Link>
                <span className="inline-flex items-center rounded-md bg-red-50 px-1 mb-6 z-10 -ml-3 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  {totalProducts}
                </span>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user} alt="" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/user-profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/user-orders"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Orders
                          </Link>
                        )}
                      </Menu.Item>
                      {userInfo && userInfo.role === "admin" ? (
                        <>
                          {" "}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/admin"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Admin Page
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/admin/orders"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {" "}
                                Orders
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/login"
                            onClick={() => {
                              dispatch(AuthSignOut());
                              dispatch(CartSignOut());
                              dispatch(OrSignOut());
                              dispatch(ProSignOut());
                              dispatch(BrandSignOut());
                              dispatch(CatSignOut());
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden"></Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;

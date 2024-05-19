import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import Section from "../../Landing/components/Section";
import TagLine from "../../Landing/components/Tagline";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductsByFilterAsync,
  selectAllProducts,
  selectTotalItems,
} from "../productSlice";
import { fetchAllBrandsAsync, selectAllBrands } from "../brandSlice";
import { fetchAllCategoriesAsync, selectAllCategories } from "../categorySlice";
import { updateProducts } from "../productSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { getTotalProductsAsync, selectCartId } from "../../Cart/cartSlice";
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "descend", current: false },
  {
    name: "Price: Low to High",
    sort: "price",
    order: "ascend",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "price",
    order: "descend",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ProductList() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);

  const cartId = useSelector(selectCartId);
  useEffect(() => {
    dispatch(getTotalProductsAsync(cartId));
  }, []);
  const products = useSelector(selectAllProducts);

  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const totalItems = useSelector(selectTotalItems);
  console.log(totalItems);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const handleFilter = (e, section, option) => {
    console.log(page);
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      if (newFilter[section.id]) {
        const updatedOptions = newFilter[section.id].filter(
          (el) => el !== option.value
        );
        newFilter[section.id] = updatedOptions;
      }
    }
    setFilter(newFilter);

    const allOptionsUnclicked = Object.values(newFilter).every(
      (options) => options.length === 0
    );
    if (allOptionsUnclicked) {
      console.log(page);
      const pagin = { page: page, limit: ITEMS_PER_PAGE };
      setFilter({});
      dispatch(fetchProductsByFilterAsync({ filter: {}, pagin }));
    }
  };

  const handleSort = (option) => {
    const sortedProducts = [...products];
    if (option.sort === "rating") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (option.sort === "price" && option.order === "ascend") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option.sort === "price" && option.order === "descend") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    dispatch(updateProducts(sortedProducts));
  };
  const pagin = { page: page, limit: ITEMS_PER_PAGE };
  const handlePagination = (page) => {
    console.log(page);
    setPage(page);
    console.log(page);
  };
  useEffect(() => {
    console.log(page);
    dispatch(fetchProductsByFilterAsync({ filter, pagin }));
    dispatch(fetchAllBrandsAsync());
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch, filter, page]);

  const filters = [
    {
      id: "Brand",
      name: "Brand",
      options: brands.map((brand) => ({
        value: brand.label,
        label: brand.label,
        checked: false,
      })),
    },
    {
      id: "category",
      name: "Category",
      options: categories.map((category) => ({
        value: category.label,
        label: category.label,
        checked: false,
      })),
    },
  ];
  return (
    <div>
      <div>
        <Section
          className="pt-[12rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
        >
          {/* Mobile filter dialog */}
          <MobileFilter
            handleFilter={handleFilter}
            setMobileFiltersOpen={setMobileFiltersOpen}
            mobileFiltersOpen={mobileFiltersOpen}
            filters={filters}
          ></MobileFilter>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <TagLine className="text-2xl  tracking-tight text-gray-100">
                All Products
              </TagLine>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-100">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={() => handleSort(option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}

                <DesktopFilter handleFilter={handleFilter} filters={filters} />
                {/* Product grid */}
                <ProductGrid products={products} filters={filters} />
              </div>
            </section>
            <Pagination
              totalItems={totalItems}
              page={page}
              setPage={setPage}
              handlePagination={handlePagination}
            />
          </main>
        </Section>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.title}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  onClick={() => {
                                    option.checked = !option.checked;
                                  }}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
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
function DesktopFilter({ handleFilter, filters }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-700 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-300">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon
                        className="h-5 w-5 text-gray-300"
                        aria-hidden="true"
                      />
                    ) : (
                      <PlusIcon
                        className="h-5 w-5 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-300"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="lg:col-span-3">
      <div>
        <div>
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <Link to={`/details/${product.id}`} key={product.id}>
                  <div className="group relative border-solid border-2 p-2 border-gray-700">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-transparent lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-300">
                          <div>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.name}
                          </div>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          <StarIcon className="w-6 h-6 inline text-yellow-500"></StarIcon>
                          <span className="align-bottom text-gray-300">
                            {product.rating}
                          </span>
                          {product.stock === 0 ? (
                            <p className="text-red-600">Out of stock</p>
                          ) : null}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm block font-medium text-gray-100">
                          $
                          {Math.round(
                            product.price *
                              (1 - product.discountPercentage / 100)
                          )}
                        </p>
                        <p className="text-sm block line-through font-medium text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

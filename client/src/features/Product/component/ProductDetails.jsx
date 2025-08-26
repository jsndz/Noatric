import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { fetchProductsByIdAsync, selectProduct } from "../productSlice";
import Loading from "../../Loading/Loading";
import {
  addToCartAsync,
  getAllCartItemsAsync,
  selectCartId,
} from "../../Cart/cartSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchProductsByIdAsync(id));
  }, [dispatch, id]);
  const cartId = useSelector(selectCartId);
  const handleCart = (cartId, productId, event) => {
    event.preventDefault();
    dispatch(addToCartAsync({ cartId, productId }));
    dispatch(getAllCartItemsAsync(cartId));
  };

  if (!product || !product.title) {
    return <Loading />;
  }
  return (
    <div className="pt-24">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-300 hover:text-gray-400"
              >
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 h-full w-full  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 h-full w-full aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0]}
              alt={product.title}
              className="  object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-white">
              ${product.price}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? "text-gray-300"
                          : "text-gray-600",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}

              {/* Sizes */}

              <button
                onClick={(event) => {
                  handleCart(cartId, product.id, event);
                }}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border   px-8 py-3 text-base font-medium  hover:text-color-1 transition-colors
 focus:outline-none focus:ring-2  border-color-1 focus:ring-offset-2 text-n-1"
              >
                Add to Cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-300">{product.description}</p>
              </div>
            </div>

            <div className="mt-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

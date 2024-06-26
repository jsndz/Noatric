import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  deleteProductAsync,
  editProductAsync,
  fetchProductsByIdAsync,
  selectProduct,
} from "../Product/productSlice";
import Loading from "../Loading/Loading";
import {
  addToCartAsync,
  getAllCartItemsAsync,
  selectCartId,
} from "../Cart/cartSlice";
import EditProductForm from "./EditProductForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AdminProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector(selectProduct);
  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmation) {
      dispatch(deleteProductAsync(id));
      navigate("/admin");
    }
  };

  useEffect(() => {
    dispatch(fetchProductsByIdAsync(id));
  }, [dispatch, id]);
  const cartId = useSelector(selectCartId);
  const handleCart = (cartId, productId, event) => {
    event.preventDefault();
    dispatch(addToCartAsync({ cartId, productId }));
    dispatch(getAllCartItemsAsync(cartId));
  };
  const [showEditForm, setShowEditForm] = useState(false);
  if (!product || !product.title) {
    return <Loading />;
  }
  return showEditForm === true ? (
    <EditProductForm
      product={product}
      setShowEditForm={setShowEditForm}
    ></EditProductForm>
  ) : (
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
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[1]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[2]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[3]}
              alt={product.title}
              className="h-full w-full object-cover object-center"
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

            <div className="mt-10">
              <button
                onClick={() => setShowEditForm(true)}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border   px-8 py-3 text-base font-medium  hover:text-color-1 transition-colors
 focus:outline-none focus:ring-2  border-color-1 focus:ring-offset-2 text-n-1"
              >
                Edit Product
              </button>
              <button
                onClick={handleDelete}
                className="mt-10 flex w-full items-center justify-center rounded-md border   px-8 py-3 text-base font-medium  hover:text-color-1 transition-colors
 focus:outline-none focus:ring-2  border-color-1 focus:ring-offset-2 text-n-1"
              >
                Delete Product
              </button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-300">{product.description}</p>
              </div>
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
            </div>

            <div className="mt-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

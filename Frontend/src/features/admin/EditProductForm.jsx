import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editProductAsync } from "../Product/productSlice";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function EditProductForm({ product, setShowEditForm }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    if (product) {
      Object.keys(product).forEach((key) => {
        setValue(key, product[key]);
      });
    }
  }, [product, setValue]);
  const dispatch = useDispatch();
  const { id } = useParams();
  return (
    <div>
      <form
        noValidate
        action="true"
        onSubmit={handleSubmit(async (data) => {
          if (data.images && typeof data.images === "string") {
            data.images = data.images.split(",").map((url) => url.trim());
          }
          dispatch(editProductAsync({ id, data }));
          setShowEditForm(false);
        })}
      >
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600">
                Edit Product Form
              </h2>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Enter Product Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label htmlFor="title">Product Name</label>
                        <input
                          type="text"
                          {...register("title", {
                            required: "Product name is required",
                          })}
                          id="title"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="description">Description</label>
                        <input
                          type="text"
                          {...register("description", {
                            required: "Description is required",
                          })}
                          id="description"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="price">Price</label>
                        <input
                          type="number"
                          {...register("price", {
                            required: "Price is required",
                          })}
                          id="price"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="discountPercentage">
                          Discount Percentage
                        </label>
                        <input
                          type="number"
                          {...register("discountPercentage", {
                            required: "Discount percentage is required",
                          })}
                          id="discountPercentage"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="rating">Rating</label>
                        <input
                          type="number"
                          step="0.1"
                          {...register("rating")}
                          id="rating"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="stock">Stock</label>
                        <input
                          type="number"
                          {...register("stock", {
                            required: "Stock is required",
                          })}
                          id="stock"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="brand">Brand</label>
                        <input
                          type="text"
                          {...register("brand", {
                            required: "Brand is required",
                          })}
                          id="brand"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label htmlFor="category">Category</label>
                        <input
                          type="text"
                          {...register("category", {
                            required: "Category is required",
                          })}
                          id="category"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="thumbnail">Thumbnail URL</label>
                        <input
                          type="text"
                          {...register("thumbnail", {
                            required: "Thumbnail URL is required",
                          })}
                          id="thumbnail"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="images">Image URLs</label>
                        <input
                          type="text"
                          {...register("images", {
                            required: "At least one image URL is required",
                          })}
                          id="images"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Enter multiple image URLs separated by commas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;

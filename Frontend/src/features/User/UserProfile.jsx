import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../Landing/components/Button";
import {
  editAddressAsync,
  getUserInfoAsync,
  removeAddressAsync,
  selectUserInfo,
  addAddressAsync,
  setNameAsync,
} from "../auth/authSlice";
import Modal from "../modal/Modal";
import TagLine from "../Landing/components/Tagline";
function UserProfile() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [edit, setEdit] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  useEffect(() => {
    dispatch(getUserInfoAsync());
  }, [dispatch]);

  const user = useSelector(selectUserInfo);
  const [indexing, setIndexing] = useState(-1);
  const handleRemove = async (index) => {
    const confirmation = await window.confirm(
      "Are you sure you want to remove this Address?"
    );
    if (confirmation) {
      await dispatch(removeAddressAsync(index));
      await dispatch(getUserInfoAsync());
    }
  };
  const handleIndexing = async (index) => {
    await setIndexing(index);
  };
  const handleEdit = async () => {
    await setEdit((prevEdit) => !prevEdit);
  };
  const handleName = async () => {
    const name = prompt("Please enter your name", user.name);
    if (name != null) {
      await dispatch(setNameAsync(name));
      await dispatch(getUserInfoAsync());
    }
  };
  const handleAddAddressClick = () => {
    console.log(showAddAddressForm);
    setShowAddAddressForm(true);
  };

  return (
    user && (
      <div>
        <div>
          <h1 className="text-white">User Details</h1>
          <div className="p-16 ">
            <div className="p-8 bg-transparent  shadow mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="relative col-span-1 md:col-span-2">
                  <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      className="h-24 w-24"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="mt-8 md:mt-6 text-center pb-8">
                    <h1 className="text-4xl font-medium z-10 text-white text-center mt-6">
                      {user.name || "Name"}
                    </h1>
                    <p className="font-light text-gray-300 mt-3">
                      {user.email}
                    </p>
                    <p className="mt-3 text-gray-300">
                      {user.addresses && user.addresses.length > 0
                        ? user.addresses[0].city
                        : "Add your address"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 md:space-y-0 md:space-x-8 flex flex-col md:flex-row justify-center md:justify-between col-span-1">
                  <Button
                    onClick={() => {
                      setShowAddressForm(true);
                    }}
                    className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Add Address
                  </Button>
                  <Button
                    onClick={handleName}
                    className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Edit Name
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <TagLine className="text-lg pl-10 text-color-1 font-semibold mt-4">
              Addresses
            </TagLine>
          </div>
          {user.addresses.length === 0 ? (
            <div className="flex flex-col mt-10 items-center justify-center h-full">
              <p className="text-gray-500">No Address Added</p>
              <Button
                onClick={() => {
                  setShowAddressForm(true);
                }}
                className="text-white py-2 px-2  uppercase border border-color-5 rounded-lg  shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Add Address
              </Button>
            </div>
          ) : edit === false ? (
            <div className="border border-color-5 m-10 rounded-lg">
              {user.addresses.map((address, index) => (
                <div
                  key={index}
                  className={`p-4 mt-4 ${
                    index !== user.addresses.length - 1
                      ? "border-b border-color-5"
                      : ""
                  }`}
                >
                  <p className="text-color-5">
                    <strong>Address {index + 1}:</strong>
                  </p>
                  <p className="text-color-2">
                    <strong>Street:</strong> {address["street-address"]}
                  </p>
                  <p className="text-color-2">
                    <strong>City:</strong> {address.city}
                  </p>
                  <p className="text-color-2">
                    <strong>Region:</strong> {address.region}
                  </p>
                  <p className="text-color-2">
                    <strong>Country:</strong> {address.country}
                  </p>
                  <p className="text-color-2">
                    <strong>Postal Code:</strong> {address["postal-code"]}
                  </p>
                  <Button
                    className="text-gray-500 mr-2 hover:text-gray-700"
                    onClick={() => {
                      handleRemove(index);
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => {
                      handleEdit();
                      handleIndexing(index);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <Modal>
              <EditAddress
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                dispatch={dispatch}
                register={register}
                getUserInfoAsync={getUserInfoAsync}
                editAddressAsync={editAddressAsync}
                indexing={indexing}
              ></EditAddress>
            </Modal>
          )}
        </div>
        {showAddressForm && (
          <Modal onClose={() => setShowAddressForm(false)}>
            <AddAddress
              setShowAddressForm={setShowAddAddressForm}
              dispatch={dispatch}
              addAddressAsync={addAddressAsync}
              getUserInfoAsync={getUserInfoAsync}
              register={register}
              handleSubmit={handleSubmit}
            ></AddAddress>
          </Modal>
        )}
      </div>
    )
  );
}
const EditAddress = ({
  handleSubmit,
  editAddressAsync,
  getUserInfoAsync,
  register,
  dispatch,
  handleEdit,
  indexing,
  set,
}) => {
  return (
    <form
      noValidate
      className="lg:w-3/4 "
      onSubmit={handleSubmit(async (data) => {
        await dispatch(editAddressAsync({ indexing, data }));
        await dispatch(getUserInfoAsync());
        handleEdit();
      })}
    >
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email", {
                  required: "email is Required",
                })}
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Country
            </label>
            <div className="mt-2">
              <select
                id="country"
                {...register("country", {
                  required: "country is Required",
                })}
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("street-address", {
                  required: "street-address is Required",
                })}
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("city", {
                  required: "city is Required",
                })}
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register("region", {
                  required: "region is Required",
                })}
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                {...register("postal-code", {
                  required: "postal-code is Required",
                })}
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={handleEdit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Undo
        </button>
        <button
          type="reset"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Change Address
        </button>
      </div>
    </form>
  );
};
const AddAddress = ({
  setShowAddressForm,
  dispatch,
  addAddressAsync,
  getUserInfoAsync,
  register,
  handleSubmit,
}) => {
  return (
    <div>
      <form
        noValidate
        className="lg:w-3/4 "
        onSubmit={handleSubmit(async (data) => {
          await dispatch(addAddressAsync(data));
          await dispatch(getUserInfoAsync());
          setShowAddressForm(false);
        })}
      >
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Address
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is Required",
                  })}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  {...register("country", {
                    required: "country is Required",
                  })}
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("street-address", {
                    required: "street-address is Required",
                  })}
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("city", {
                    required: "city is Required",
                  })}
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("region", {
                    required: "region is Required",
                  })}
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  {...register("postal-code", {
                    required: "postal-code is Required",
                  })}
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;

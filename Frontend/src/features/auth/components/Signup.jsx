import React from "react";
import Logo from "/logo.png";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectToken, createUserAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const tkn = useSelector(selectToken);

  return (
    <div>
      {tkn ? <Navigate to="/" /> : null}
      <section className="min-h-screen flex items-stretch text-white ">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0" />
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Keep it special
            </h1>
            <p className="text-3xl my-4">
              Capture your personal memory in unique way, anywhere.
            </p>
          </div>
          <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4"></div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0" />
          </div>
          <div className="w-full py-6 z-20">
            <div className="pl-28">
              <img src={Logo} alt="company Logo" />
            </div>

            <form
              noValidate
              action="true"
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                  })
                );
              })}
            >
              <div className="pb-2 pt-4">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /\b^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$\b/gi,
                      message: "Invalid Email",
                    },
                  })}
                  id="email"
                  placeholder="Email"
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  {...register("password", {
                    required: "Password is Required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
- Can contain special characters`,
                    },
                  })}
                  id="password"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is Required",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Password does not match",
                  })}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
              <div className="px-4 pb-2 pt-4">
                <button
                  type="submit"
                  className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                >
                  sign Up
                </button>
              </div>
              <div className="text-gray-600">
                <p className="inline">Already a member?</p>
                <span className="inline-block ml-2">
                  <Link
                    to="/login"
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    Log In
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;

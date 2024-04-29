import React from "react";
import Logo from "/logo.png";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, selectError, selectToken } from "../authSlice";
function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const tkn = useSelector(selectToken);
  const error = useSelector(selectError);
  return (
    <>
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
                  loginUserAsync({ email: data.email, password: data.password })
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
              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                  id="password"
                  placeholder="Password"
                />
              </div>
              <p className="text-red-500 ">{error}</p>
              <Link to="/reset-password">
                <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                  <button>Forgot your password?</button>
                </div>
              </Link>
              <div className="px-4 pb-2 pt-4">
                <button
                  type="submit"
                  className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                >
                  sign in
                </button>
              </div>{" "}
              <div className="text-gray-600">
                <p className="inline">Not a member?</p>
                <span className="inline-block ml-2">
                  <Link
                    to="/signup"
                    className="text-indigo-500 hover:text-indigo-600"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;

import React, { useEffect } from "react";
import Logo from "/noatric-removebg.png";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAsync,
  resetError,
  selectError,
  selectToken,
} from "../authSlice";
import Section from "../../Landing/components/Section";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const tkn = useSelector(selectToken);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);
  return (
    <>
      {tkn ? <Navigate to="/" /> : null}
      <section className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="py-6">
          <div className="border-gray-600 pr-8">
            <img src={Logo} width={400} height={400} alt="side" />
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
          <div className="w-full py-6 z-20">
            <form
              noValidate
              action="true"
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginUserAsync({
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
                  Sign In
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

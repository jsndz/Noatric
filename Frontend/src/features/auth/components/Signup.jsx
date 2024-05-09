import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "/noatric-removebg.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, selectError, selectToken } from "../authSlice";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const tkn = useSelector(selectToken);

  const error = useSelector(selectError);
  return (
    <div>
      {tkn ? <Navigate to="/" /> : null}
      <section className="min-h-screen flex items-stretch justify-center text-white">
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
          <div className="border-r-2 border-gray-600 pr-8">
            {" "}
            <img src={Logo} width={400} height={400} alt="Noatric" />
          </div>
          <div className="w-full py-6">
            <form
              noValidate
              action="true"
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              onSubmit={handleSubmit(async (data) => {
                await dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                  })
                );
              })}
            >
              {/* Email input */}
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
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password input */}
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
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password input */}
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
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="px-4 pb-2 pt-4">
                <button
                  type="submit"
                  className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-red-500 ">{error}</p>

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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordAsync, selectError } from "../authSlice";

function ResetPassword() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(false);
  const [email, setEmail] = useState("");
  const handleReset = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAsync(email));
    setMsg(true);
  };
  const error = useSelector(selectError);
  return (
    <div>
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Reset password</h1>
        <p className="text-slate-500">Fill up the form to reset the password</p>
        <form action className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <p className="text-red-500 ">{error}</p>
            <button
              onClick={handleReset}
              className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
              <span>Reset password</span>
            </button>
            <p className="text-center">
              Not registered yet?{" "}
              <p className="text-indigo-600 font-medium inline-flex space-x-1 items-center">
                <Link to="/signup">Register now </Link>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </p>
              {msg && (
                <p className="text-green-500">
                  A reset link has been sent to your email
                </p>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

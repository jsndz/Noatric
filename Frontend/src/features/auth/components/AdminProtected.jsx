import React, { useEffect } from "react";
import { getUserInfoAsync, selectToken, selectUserInfo } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtected({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoAsync());
  }, []);
  const userInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  if (!token) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (userInfo && userInfo.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
}

export default AdminProtected;

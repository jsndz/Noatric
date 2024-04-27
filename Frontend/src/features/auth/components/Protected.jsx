import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectToken, selectUser } from "../authSlice";
function Protected({ children }) {
  const tkn = useSelector(selectToken);
  if (!tkn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default Protected;

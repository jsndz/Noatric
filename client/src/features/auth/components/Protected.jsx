import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  AuthHeaderSet,
  getUserInfoAsync,
  selectToken,
  selectUser,
} from "../authSlice";

function Protected({ children }) {
  const dispatch = useDispatch();
  const tkn = useSelector(selectToken);

  useEffect(() => {
    if (tkn) {
      dispatch(getUserInfoAsync());
    }
  }, [dispatch, tkn]);

  if (!tkn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Protected;

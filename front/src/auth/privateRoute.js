import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const PrivateRoute = ({ children }) => {
  const { state } = useAuth();

  return state.token ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;

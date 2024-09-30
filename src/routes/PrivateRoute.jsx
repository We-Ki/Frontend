import React from "react";
import { Navigate } from "react-router-dom";
import { useIsLoginState } from "../contexts/IsLoginContext";

function PrivateRoute({ component: Component }) {
  return useIsLoginState() ? Component : <Navigate to="/signin" />;
}

export default PrivateRoute;

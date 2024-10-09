import React from "react";
import { Navigate } from "react-router-dom";
import * as auth from "../utils/auth";
function ProtectedRoute({ children, loggedIn }) {

  return loggedIn ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;

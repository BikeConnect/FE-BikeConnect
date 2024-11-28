import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!allowedRoles.includes(decoded.role)) {
      if (decoded.role === "customer") {
        return <Navigate to="/user-dashboard" replace />;
      } else if (decoded.role === "owner") {
        return <Navigate to="/owner-dashboard" replace />;
      }
      return <Navigate to="/" replace />;
    }
    return children;
  } catch (error) {
    console.log("Token decode error", error.message);
    localStorage.removeItem("accessToken");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;

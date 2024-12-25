import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // const token = localStorage.getItem("accessToken");
  const token = allowedRoles.includes("admin")
    ? localStorage.getItem("accessToken")
    : localStorage.getItem("accessToken");
    
  if (!token) {
    if (allowedRoles.includes("admin")) {
      return <Navigate to="/admin-login" replace />;
    }
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!allowedRoles.includes(decoded.role)) {
      switch (decoded.role) {
        case "admin":
          return <Navigate to="/admin/dashboard" replace />;
        case "customer":
          return <Navigate to="/user-dashboard" replace />;
        case "owner":
          return <Navigate to="/owner-dashboard" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    }
    return children;
  } catch (error) {
    console.log("Token decode error", error.message);
    localStorage.removeItem(
      allowedRoles.includes("admin") ? "accessToken" : "accessToken"
    );
    return (
      <Navigate
        to={allowedRoles.includes("admin") ? "/admin-login" : "/admin/dashboard"}
        replace
      />
    );
  }
};

export default ProtectedRoute;

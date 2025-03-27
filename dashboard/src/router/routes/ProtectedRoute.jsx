import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { isEmpty, includes, find, lowerCase } from "lodash";
import publicRoutes from "./publicRoute";

const ProtectedRoute = ({ role, children, status, visibility, ability }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    isEmpty(userInfo) &&
    find(
      publicRoutes,
      (route) =>
        lowerCase(route) === lowerCase(location.pathname) &&
        location.pathname !== "/"
    )
  ) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  if (
    (userInfo.role === role && userInfo.status === status) ||
    includes(ability, userInfo.role) ||
    includes(visibility, userInfo.status)
  ) {
    return <Suspense fallback={null}>{children}</Suspense>;
  }

  if (userInfo.role === "seller" && userInfo.status === "pending") {
    return (
      <Navigate
        to="/seller/account/pending"
        state={{ from: location }}
        replace
      />
    );
  }

  if (userInfo.role === "seller" && userInfo.status === "inactive")
    return (
      <Navigate
        to="/seller/account/inactive"
        state={{ from: location }}
        replace
      />
    );

  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default ProtectedRoute;

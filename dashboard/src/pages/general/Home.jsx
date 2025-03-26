import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { role } = useSelector((state) => state.auth.userInfo);

  switch (role) {
    case "seller":
      return <Navigate to={"/seller/dashboard"} replace />;
    case "admin":
      return <Navigate to={"/admin/dashboard"} replace />;
    default:
      return <Navigate to={"/login"} replace />;
  }
};

export default Home;

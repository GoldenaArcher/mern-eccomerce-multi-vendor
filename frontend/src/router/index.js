import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import ShopListPage from "../pages/ShopListPage";
import ShopsDetails from "../pages/ShopDetails";
import Cart from "../pages/Cart";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shops" element={<ShopListPage />} />
          <Route path="/shops/:shop-id" element={<ShopsDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;

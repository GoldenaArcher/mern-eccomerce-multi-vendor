import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import ShopListPage from "../pages/ShopListPage";
import ShopsDetails from "../pages/ShopDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Category from "../pages/Category";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shops" element={<ShopListPage />} />
        <Route path="/shops/:shopId" element={<ShopsDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path='/category/:categoryId' element={<Category />}/>
      </Route>
    </Routes>
  );
};

export default index;

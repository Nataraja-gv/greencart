import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/mainlayout";
import HomePage from "../pages/homePage";
import LoginPage from "../pages/loginpage";
import SignUp from "../pages/signup";
import ProductDetailsPage from "../pages/productDetailsPage";
import SellerLoginPage from "../pages/sellerLoginpage";
import SellerDashBoard from "../layout/sellerDashboard";
import SellerProduct from "../pages/sellerProduct";
import AddProduct from "../section/addProduct";
import CartPage from "../pages/cartPage";
import SellerCategory from "../pages/sellerCategory";
import AddCategory from "../section/addCategory";
import NoPage from "../pages/noPage";
import AddAddress from "../pages/add_address";
import SellerOrders from "../pages/sellerOrders";
import UserProfile from "../pages/userProfile";
import SearchProduct from "../pages/searchProduct";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignUp />} />
          <Route path="add/address" element={<AddAddress />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/seller/login" element={<SellerLoginPage />} />

          <Route path="/seller" element={<SellerDashBoard />}>
            <Route index element={<h1>Seller Dashboard Home</h1>} />
            <Route path="product" element={<SellerProduct />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product/edit/:id" element={<AddProduct />} />
            <Route path="category" element={<SellerCategory />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="orders" element={<SellerOrders />} />
          </Route>

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

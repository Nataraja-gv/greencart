import React from "react";
import BannerPage from "../section/banner";
import Category from "../section/category";
import ProductPage from "./productPage";
import AdsPage from "./adsPage";
const HomePage = () => {
  return (
    <div className="w-[80%] mx-auto">
      <BannerPage />
      <Category />
      <ProductPage />
      <AdsPage />
    </div>
  );
};

export default HomePage;

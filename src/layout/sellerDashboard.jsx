import React from "react";
import SellerSideBar from "./sellerSideBar";
import { Outlet } from "react-router-dom";

const SellerDashBoard = () => {
  return (
    <div className="flex  ">
      <SellerSideBar />
      <div className="flex-1 p-5 mt-[30px]">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashBoard;

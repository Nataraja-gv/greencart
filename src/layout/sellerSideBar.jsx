import React from "react";
import { Link, useLocation } from "react-router-dom";

const sellerSideBarManu = [
  { _id: "seller_dashboard", label: "Dashboard", path: "/seller" },
  { _id: "seller_Product", label: "Product", path: "/seller/product" },
  { _id: "seller_category", label: "Category", path: "/seller/category" },
  { _id: "seller_orders", label: "Orders", path: "/seller/orders" },
];

const SellerSideBar = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Seller Panel</h2>
      <ul className="space-y-4">
        {sellerSideBarManu.map((item) => (
          <li key={item._id}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-gray-700 transition ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerSideBar;

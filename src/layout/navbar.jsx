import { ShoppingCart } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userLogout } from "../services/userAuth/userlogout";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

const NavBar = () => {
  const userData = useSelector((state) => state.user);
  const cartItem = useSelector((state) => state.cart);
  const navigate=useNavigate()

  const totalQuantity = cartItem?.cartItems?.reduce(
    (acc, item) => ({ quantity: acc.quantity + item.quantity }),
    { quantity: 0 }
  )?.quantity;

  const { enqueueSnackbar } = useSnackbar();
  const handleLogout = async () => {
    const res = await userLogout();
    enqueueSnackbar(res.message, {
      variant: "error",
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        {/* Logo */}
        <img
          src="https://greencart-gs.vercel.app/assets/logo-CMLzTNjw.svg"
          alt="Logo"
          className="w-[170px] h-auto cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />

        {/* Navigation and Search */}
        <div className="flex items-center gap-[16px]">
          {/* Seller Dashboard Badge */}
          <span
            className="bg-gray-300 px-3 py-1 rounded-full text-[14px] text-center"
            onClick={() => (window.location.href = "/seller")}
          >
            Seller Dashboard
          </span>

          {/* Navigation Links */}
          <ul className="flex items-center gap-5">
            <li
              className="font-medium cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </li>
            <li className="font-medium cursor-pointer">All Products</li>
          </ul>

          {/* Search Input */}
          <label className="input input-success w-[300px] rounded-[20px] flex items-center">
            <SearchIcon className="h-[1em] opacity-50" />
            <input
              type="search"
              required
              placeholder="Search Products"
              className="border-none focus:outline-none w-full ml-2"
            />
          </label>

          {/* Shopping Cart Icon */}
          <div className="flex relative">
            <ShoppingCart className="cursor-pointer"  onClick={()=>navigate("/cart")}/>
            {totalQuantity > 0 && (
              <span className="bg-green-500 text-white rounded-full text-xs absolute top-[-15px] right-[-5px] px-2 h-6 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>

          {/* User Avatar and Dropdown */}
          <div className="dropdown dropdown-end">
            <div className=" flex  gap-3 items-center">
              <h4 className=" capitalize font-[400] ">
                {" "}
                Welcome, {userData.name || "User"}
              </h4>
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full overflow-hidden flex ">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <span className="justify-between">Profile</span>
              </li>
              <li>
                {userData?.name ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <a href="/login">Login</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </g>
  </svg>
);

export default NavBar;

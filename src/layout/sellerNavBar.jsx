import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SellerLogout } from "../services/sellerAuth/sellerLogin";
import { removeSeller } from "../utils/features/sellerSlice";

const SellerNavBar = () => {
  const sellerUser = useSelector((state) => state.seller);
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await SellerLogout();
      if (res) {
       enqueueSnackbar("Seller Logout successful!", { variant: "error" });
        dispatch(removeSeller())
      }
    } catch (error) {
      console.log(error)
    }
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

        {/* User Info and Logout */}
        <div className="dropdown dropdown-end">
          <div className="flex gap-3 items-center">
            <h4 className="capitalize font-[400]">
              Welcome,{sellerUser?.name || "Seller"}
            </h4>
            {sellerUser?.name ? (
              <button onClick={handleLogout} className="btn btn-sm btn-outline">
                Logout
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = "/seller/login")}
                className="btn btn-sm btn-outline"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerNavBar;

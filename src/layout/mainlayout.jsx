import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./footer"
import { useDispatch, useSelector } from "react-redux";
import { sellerProfile, UserProfile } from "../services/userProfile";
import { addUser } from "../utils/features/userSlice";
// import SellerNavBar from "./sellerNavBar";
import { addSeller } from "../utils/features/sellerSlice";
import NavBar from "./navbar";
import SellerNavBar from "./sellerNavBar"

const MainLayout = () => {
  const location = useLocation();

  const userData = useSelector((state) => state.user);
  const sellerUser = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const hiddenFooterRoutes = [/^\/seller\/*$/, /^\/seller\/.*$/];
  const hiddenNavBarRoutes = [/^\/seller\/*$/, /^\/seller\/.*$/];

  useEffect(() => {
    const fetchUser = async () => {
      if (!sellerUser || Object.keys(sellerUser).length === 0) {
        try {
          const seller = await sellerProfile();
          if (seller?.data) {
            dispatch(addSeller(seller.data));
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUser();
  }, [dispatch, sellerUser]);

  useEffect(() => {
    const fetchSeller = async () => {
      if (!userData || Object.keys(userData).length === 0) {
        try {
          const user = await UserProfile();
          if (user?.data) {
            dispatch(addUser(user.data));
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchSeller();
  }, [dispatch, userData]);

  const isFooterHidden = hiddenFooterRoutes.some((pattern) =>
    pattern.test(location.pathname)
  );
  const isNavBarHidden = hiddenNavBarRoutes.some((pattern) =>
    pattern.test(location.pathname)
  );

  return (
    <div className="flex flex-col">
      {isNavBarHidden ? <SellerNavBar /> : <NavBar />}

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      {!isFooterHidden && <Footer />}
    </div>
  );
};

export default MainLayout;

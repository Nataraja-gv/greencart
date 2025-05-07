import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { SellerAuthLogin } from "../services/sellerAuth/sellerLogin";
import { addSeller } from "../utils/features/sellerSlice";

const SellerLoginPage = () => {
  const [sellerData, setSellerData] = useState({
    email: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setSellerData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await SellerAuthLogin(sellerData);
      if (res) {
        dispatch(addSeller(res?.data));
        navigate("/seller");
        enqueueSnackbar("Seller Login successful!", { variant: "success" });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Login failed";
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-white shadow-xl rounded-lg p-8 w-[400px]">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">
          Seller Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="type here"
              value={sellerData?.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="type here"
              value={sellerData?.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
          >
            Seller Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLoginPage;

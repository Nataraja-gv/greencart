import React, { useState } from "react";
import { userAuthLogin } from "../services/userAuth/userAuth";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { addUser } from "../utils/features/userSlice";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const {enqueueSnackbar} = useSnackbar()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userAuthLogin(userData);
      if (res) {
        dispatch(addUser(res?.data));
        navigate("/");
        enqueueSnackbar("Login successful!", { variant: "success" });
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
          User Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="type here"
              value={userData?.email}
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
              value={userData?.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            Create an account?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              click here
            </a>
          </p>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

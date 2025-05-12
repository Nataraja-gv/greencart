import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const updatePostCart = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/auth/cart/update",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const clearCartItem = async (data) => {
  const config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: "/auth/cart/clear",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

export const orderToPlaced = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/auth/order",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

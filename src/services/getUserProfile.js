import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";

export const getUserProfile = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `/auth/profile/view`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axiosInstance.request(config);
    return res.data?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};



export const getUserOrders = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `/auth/users/all/orders`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axiosInstance.request(config);
    return res.data?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};


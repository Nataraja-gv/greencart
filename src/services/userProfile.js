import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";

export const UserProfile = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/auth/profile/view",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    // enqueueSnackbar(error.response.data.message, {
    //   variant: "error",
    // });
    console.log(error.response.data.message);
  }
};

export const sellerProfile = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/seller/profile",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    // enqueueSnackbar(error.response.data.message, {
    //   variant: "error",
    // });
    console.log(error.response.data.message);
  }
};

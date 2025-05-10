 
import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const getUserAddress = async () => {
  const  config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/auth/allAddress",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data?.data;
  } catch (error) {
    enqueueSnackbar(error?.message, { variant: "error" });
  }
};



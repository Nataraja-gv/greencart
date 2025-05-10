import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";

export const addAddresss = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/auth/addAddress",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data;
  } catch (error) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};

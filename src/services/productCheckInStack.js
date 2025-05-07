import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";

export const ProductCheckInStack = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/products/update/stock",
    headers: {
      "Content-Type": "application/json",
    },
    data:data
  };
  try {
    const res = await axiosInstance.request(config);
    return res.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

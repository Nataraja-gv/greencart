import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";

export const getReport = async (id) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `/seller/report`,
    headers: {
      "Content-Type": "application/json",
    },
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
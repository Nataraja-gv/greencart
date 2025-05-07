import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";

export const addCategory = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/product/category/add",
    headers: {
      "Content-Type": "multipart/form-data",
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

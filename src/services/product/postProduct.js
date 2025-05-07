import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const addProduct = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/product/add",
    headers: {
      "Content-Type": "multipart/form-data",
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

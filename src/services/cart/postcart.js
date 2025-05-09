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

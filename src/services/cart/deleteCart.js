import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const patchCartItems = async (data) => {
  const config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: "/auth/cart/Items/delete",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axiosInstance.request(config);
    return res?.data?.data;
  } catch (error) {
    enqueueSnackbar(error?.message, { variant: "error" });
  }
};

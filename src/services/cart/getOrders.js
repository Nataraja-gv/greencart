import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const getSellerOrders = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/auth/seller/all/orders",
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

export const patchOrderUpdate = async (id, data) => {
  const config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: `/auth/seller/order/update/${id}`,
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

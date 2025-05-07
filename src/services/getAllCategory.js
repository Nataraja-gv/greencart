import { enqueueSnackbar } from "notistack";
import axiosInstance from "../utils/axiosInstance";

export const getAllCatgory = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/product/category/all",
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

export const getAllProduct = async () => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: "/products/view/all",
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

export const getProductsDetailsById = async (id) => {
  const config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: `products/view/${id}`,
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

import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const UpdateProduct = async (_id, data) => {
  const config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: `products/update/${_id} `,
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

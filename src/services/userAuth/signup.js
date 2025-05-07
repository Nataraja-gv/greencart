import { enqueueSnackbar } from "notistack";
import axiosInstance from "../../utils/axiosInstance";

export const userSignup = async (data) => {
  try {
    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "/auth/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await axiosInstance.request(config);
    return res.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

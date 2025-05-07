import { enqueueSnackbar } from "notistack";
import axios from "../../utils/axiosInstance";

export const userAuthLogin = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

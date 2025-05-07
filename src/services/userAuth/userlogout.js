import { enqueueSnackbar } from "notistack";
import axios from "../../utils/axiosInstance";

export const userLogout = async () => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/auth/logout",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);
    return response?.data;
  } catch (error) {
    enqueueSnackbar(error.response.data.message, {
      variant: "error",
    });
  }
};

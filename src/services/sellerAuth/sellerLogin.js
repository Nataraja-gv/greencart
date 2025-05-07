import { enqueueSnackbar } from "notistack";
import axios from "../../utils/axiosInstance";

export const SellerAuthLogin = async (data) => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/seller/login",
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

export const SellerLogout = async () => {
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: "/seller/logout",
    headers: {
      "Content-Type": "application/json",
    },
  
  };

  try {
    const res = await axios.request(config);
    return res;
  } catch (error) {
    enqueueSnackbar(error.message, {
      variant: "error",
    });
  }
};

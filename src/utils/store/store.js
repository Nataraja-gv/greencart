import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import sellerSlice from "../features/sellerSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    seller: sellerSlice,
  },
});

export default store;

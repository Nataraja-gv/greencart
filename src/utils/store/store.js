import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import sellerSlice from "../features/sellerSlice";
import cartReducer from "../features/cartSlice";
import searchReducer from "../features/searchSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    seller: sellerSlice,
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;

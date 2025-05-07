import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    addSeller: (state, action) => {
      return action.payload;
    },
    removeSeller: (state) => {
      return null;
    },
  },
});

export const { addSeller, removeSeller } = sellerSlice.actions;
export default sellerSlice.reducer;

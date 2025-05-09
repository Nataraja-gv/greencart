import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (itemId) => itemId.item === item
      );

      if (existingItem) {
        return;
      } else {
        state.cartItems.push({ item, quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems.filter((item) => item.item != action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.item === action.payload
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.item === action.payload
      );

      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity === 1) {
          state.cartItems.splice(itemIndex, 1);
        } else {
          state.cartItems[itemIndex].quantity -= 1;
        }
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

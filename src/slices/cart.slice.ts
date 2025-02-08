import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const CART_FEATURE_KEY = "cart";

type CartState = {
  items: any[];
};

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: CART_FEATURE_KEY,
  initialState,
  reducers: {
    addItemToCart(
      state: CartState,
      action: PayloadAction<{
        item: any;
      }>,
    ) {
      const { item } = action.payload;

      state.items.push(item);
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelectors = {
  getCartItems: (state: { cart: any }) => state.cart.items,
};

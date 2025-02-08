import { configureStore } from "@reduxjs/toolkit";
import { stripeAPI } from "./queries/stripeAPI";
import { CART_FEATURE_KEY, cartReducer } from "./slices/cart.slice";

export const store = configureStore({
  reducer: {
    [stripeAPI.reducerPath]: stripeAPI.reducer,
    [CART_FEATURE_KEY]: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stripeAPI.middleware),
});

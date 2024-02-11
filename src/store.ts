import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { productSlice } from "./features/products/productSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

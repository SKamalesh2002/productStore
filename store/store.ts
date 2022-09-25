import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/slice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: { counter: counterReducer, product: productReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

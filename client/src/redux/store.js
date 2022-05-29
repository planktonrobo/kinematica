import { configureStore } from "@reduxjs/toolkit";
import robotReducer from "./robotSlice";
import { api } from "../api/socketClient";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    robot: robotReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

import { configureStore } from "@reduxjs/toolkit";

import singUpReducer from "../slices/userSingupSlice";

export const store = configureStore({
  reducer: {
    signup: singUpReducer, // Use lowercase 'signup' here
  },
});

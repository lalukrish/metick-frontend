import { configureStore } from "@reduxjs/toolkit";

import singUpReducer from "../slices/userSingupSlice";
import signInReducer from "../slices/userSigninSlice";

export const store = configureStore({
  reducer: {
    signup: singUpReducer, // Use lowercase 'signup' here
    signin: signInReducer,
  },
});

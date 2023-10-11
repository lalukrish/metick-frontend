import { configureStore } from "@reduxjs/toolkit";

import singUpReducer from "../slices/userSingupSlice";
import signInReducer from "../slices/userSigninSlice";
import userGetProfile from "../slices/userProfileSlice";
import getMyProfile from "../slices/userProfileImage";

export const store = configureStore({
  reducer: {
    signup: singUpReducer, // Use lowercase 'signup' here
    signin: signInReducer,
    myprofile: userGetProfile,
    myprofilepic: getMyProfile,
  },
});

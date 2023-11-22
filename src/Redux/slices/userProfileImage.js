import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reject } from "lodash";

export const userProfilePicture = createAsyncThunk(
  "myprofilepic",
  async (_, { rejectWithValue }) => {
    const userId = localStorage.getItem("USER_ID");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NEXTTECH_DEV_URL}/get-user-profile-image/${userId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Authorization":
          },
        }
      );
      console.log("dada", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const userProfilePictureSlice = createSlice({
  name: "myprofilepic",
  initialState: {
    loading: false,
    successMessage: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfilePicture.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(userProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(userProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default userProfilePictureSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userProfile = createAsyncThunk(
  "myProfile",
  async (_, { rejectWithValue }) => {
    const userId = localStorage.getItem("USER_ID");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NEXTTECH_DEV_URL}/admin/get-one-user/${userId}`,
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
      return rejectWithValue(error);
    }
  }
);

const userProfileSlice = createSlice({
  name: "myprofile",
  initialState: {
    loading: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default userProfileSlice.reducer;

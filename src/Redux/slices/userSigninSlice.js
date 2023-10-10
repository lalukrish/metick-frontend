import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UserSignin = createAsyncThunk(
  "auth/signin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NEXTTECH_DEV_URL}/user-signin`,
        userData,
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
            Accept: "application/json", // Correct the Accept header
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const signinSlice = createSlice({
  name: "auth/signin",
  initialState: {
    loading: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserSignin.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(UserSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.data;
      })
      .addCase(UserSignin.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.data;
      });
  },
});

export default signinSlice.reducer;

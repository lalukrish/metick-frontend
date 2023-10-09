import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const SignupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    const api = process.env.REACT_APP_BASE_URL;
    console.log("api", api);
    try {
      const url = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user-signup`,
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

const signupSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false, // Set the initial loading state to false
    successMessage: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignupUser.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.data.message;
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default signupSlice.reducer;

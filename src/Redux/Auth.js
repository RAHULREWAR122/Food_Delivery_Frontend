import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = 'https://food-management-api.vercel.app/api'

export const RegisterUser = createAsyncThunk(
  "auth/registerUser",
  async (authData, thunkAPI) => {
    try {
      const req = await axios.post(`${api}/register` , authData);
      return req.data;
    }catch (error) {
      console.log("Error in fetching data:", error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const LoginUser = createAsyncThunk(
  "auth/loginUser",
  async (authData, thunkAPI) => {
    try {
      const req = await axios.post( `${api}/login` , authData);

      return req.data;
    } catch (error) {
      console.log("Error in fetching data:", error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  data: null,
  loading: false,
  error: null,
};

const Verification = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const authReducer = Verification.reducer;
export const AuthSelector = (state) => state.authReducer;

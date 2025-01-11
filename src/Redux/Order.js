import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = 'https://food-management-api.vercel.app/api'
const token = JSON.parse(localStorage.getItem('token'))

export const allOrders = createAsyncThunk(
  "order/allOrders",
  async (_, thunkAPI) => {
    // console.log("token is " , token)
    try {
        const req = await axios.get(`${api}/allOrders` , {
          headers : {
            "Authorization" : `${token}`
          }
      }); 
      return req.data;
    }catch (error) {
      console.log("Error in fetching data:", error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (authData, thunkAPI) => {
    console.log(authData)
    try {
      const req = await axios.post(`${api}/addOrder` , authData , {
        headers : {
          "Authorization" : `${token}`
        }
      });

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

const oderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    })
      .addCase(allOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const orderReducer = oderSlice.reducer;
export const orderSelector = (state) => state.orderReducer;

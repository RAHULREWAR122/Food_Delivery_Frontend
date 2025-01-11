import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = 'https://food-management-api.vercel.app/api'
const token = JSON.parse(localStorage.getItem('token'))

export const allMenu = createAsyncThunk(
  "menu/allMenu",
  async (_, thunkAPI) => {
    try {
      const req = await axios.get(`${api}/allMenu` , {
         headers : {
             "Authorization" : `${token}`
         }
      });
      if(req.status === 200){
          return req.data;
      }else{
        console.log("something went wrong")
      }   
    } catch (error) {
      console.log("Error in fetching data:", error.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (authData, thunkAPI) => {
    try {
      const req = await axios.post( `${api}/addMenu` , authData ,{
        headers : {
            "Authorization" : `${token}`
        }
      });
       if(req.status === 201){
           return req.data;
       }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({data , id}, thunkAPI) => {
    console.log(data ,id)
    
    // try {
    //   const req = await axios.post( `${api}/updateMenu` , data ,{
    //     headers : {
    //         "Authorization" : `${token}`
    //     }
    //   });
    //    if(req.status === 201){
    //        return req.data;
    //    }
    // } catch (error) {
    //   return thunkAPI.rejectWithValue(error.response.data);
    // }
  }
);


const initialState = {
  data: null,
  loading: false,
  error: null,
};

const MenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
      .addCase(allMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    })
      .addCase(allMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
      .addCase(addMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const menuReducer = MenuSlice.reducer;
export const MenuSelector = (state) => state.menuReducer;

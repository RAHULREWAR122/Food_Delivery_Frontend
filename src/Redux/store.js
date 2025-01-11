import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './Auth';
import { menuReducer } from './Menu';
import { orderReducer } from './Order';


export const store = configureStore({
  reducer: {
    authReducer,
    menuReducer ,
    orderReducer             
  },
  
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
    

export default store;
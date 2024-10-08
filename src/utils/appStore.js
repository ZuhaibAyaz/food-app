import {configureStore} from '@reduxjs/toolkit';
import cartReducer from "./cartSlice";
import filterSlice from './filterSlice';
import authSlice from './authSlice';

const appStore = configureStore({

  reducer:{
     cart: cartReducer,
     filterSlice,
     authSlice
    
  },
    
});

export default appStore;
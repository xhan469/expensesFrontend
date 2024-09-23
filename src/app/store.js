import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
//import expensesReducer from './expensesReducer';
import expensesSlice from './expensesSlice';


export const store = configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    expensesSlice: expensesSlice
  },
});

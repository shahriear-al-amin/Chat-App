import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice'
import selectedUserslise from './Slices/Selecteduserslise'
export const store = configureStore({
  reducer: {
    user : userReducer,
    activeuser : selectedUserslise
  },
})
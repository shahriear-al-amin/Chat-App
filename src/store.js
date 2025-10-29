import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/userSlice'
import selectedUserSlice  from './Slices/Selecteduserslise'



export const store = configureStore({
  reducer: {
    user: userReducer,
    activeUser: selectedUserSlice
  },
})

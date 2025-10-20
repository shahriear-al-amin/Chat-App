import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",
};

export const userSlice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    userInfo: (state,actions) => {
      state.value  = actions.payload;
    },
  },
});

export const { userInfo } = userSlice.actions;

export default userSlice.reducer;

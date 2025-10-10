import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
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

// selectedUserSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
};

export const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    selectedUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;

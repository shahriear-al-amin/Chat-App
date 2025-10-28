import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
};

export const selectedUserslise = createSlice({
  name: 'selecteduser',
  initialState,
  reducers: {
    selectedUser: (state,actions) => {
      state.value  = actions.payload;
    },
  },
});

export const  {selectedUser}  = selectedUserslise.actions;

export default selectedUserslise.reducer;

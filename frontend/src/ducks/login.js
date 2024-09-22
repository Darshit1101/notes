import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    postRegisterData: (state, action) => { },
  }
});

export const {
  postRegisterData,
} = login.actions;

export default login.reducer;

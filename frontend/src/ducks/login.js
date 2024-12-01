import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    postRegisterData: (state, action) => { },
    postLoginData: (state, action) => { },
  }
});

export const {
  postRegisterData,
  postLoginData,
} = login.actions;

export default login.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getProfile: (state, action) => { },
    getProfileSuccess: (state, action) => {
      return { ...state, profile: action.payload };
    },
  }
});

export const {
  getProfile,
  getProfileSuccess,
} = auth.actions;

export default auth.reducer;
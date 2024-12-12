import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const loading = createSlice({
  name: 'home',
  initialState,
  reducers: {
    load: (state, action) => {
      return { ...state, isLoading: true }
    },
    loaded: (state, action) => {
      return { ...state, isLoading: false };
    },
  }
});

export const {
  load,
  loaded
} = loading.actions;

export default loading.reducer;
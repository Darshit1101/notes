import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addNote: (state, action) => { },
    addNoteSuccess: (state, action) => {
      return { ...state, addNoteList: action.payload };
    },
  }
});

export const {
  addNote,
  addNoteSuccess,
} = dashboard.actions;

export default dashboard.reducer;

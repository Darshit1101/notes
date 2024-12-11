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
    getAllNote: (state,action) => { },
    getAllNoteSuccess: (state, action) => {
      console.log("action.payload", action.payload)
      return {...state, getAll : action.payload};
    },
  }
});

export const {
  addNote,
  addNoteSuccess,
  getAllNote,
  getAllNoteSuccess
} = dashboard.actions;

export default dashboard.reducer;

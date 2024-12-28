import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addNote: (state, action) => { },
    getAllNote: (state, action) => { },
    getAllNoteSuccess: (state, action) => {
      return { ...state, getAll: action.payload };
    },
    deleteCard: (state, action) => { },
    editNote: (state, action) => { },
  }
});

export const {
  addNote,
  getAllNote,
  getAllNoteSuccess,
  deleteCard,
  editNote,
} = dashboard.actions;

export default dashboard.reducer;

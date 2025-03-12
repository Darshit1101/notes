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
    deleteBulkNotes: (state, action) => { },
    exportNote: (state, action) => { },
  }
});

export const {
  addNote,
  getAllNote,
  getAllNoteSuccess,
  deleteCard,
  editNote,
  deleteBulkNotes,
  exportNote
} = dashboard.actions;

export default dashboard.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getDashboard: (state, action) => { },
    getDashboardSuccess: (state, action) => {
      return { ...state, dashboard: action.payload };
    },
    getNotiTypList: (state, action) => { },
    getNotifTypeListSuccess: (state, action) => {
      return { ...state, getNotiTypList: action.payload };
    }
  }
});

export const {
  getDashboard,
  getDashboardSuccess,
  getNotiTypList,
  getNotifTypeListSuccess
} = dashboard.actions;

export default dashboard.reducer;

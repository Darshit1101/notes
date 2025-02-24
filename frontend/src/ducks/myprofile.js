import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const myprofile = createSlice({
    name: 'myprofile',
    initialState,
    reducers: {
        deleteAccount: (state, action) => { },
    }
});

export const {
    deleteAccount
} = myprofile.actions;

export default myprofile.reducer;
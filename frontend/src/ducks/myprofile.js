import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const myprofile = createSlice({
    name: 'myprofile',
    initialState,
    reducers: {
        deleteAccount: (state, action) => { },
        cPwd: (state, action) => { },

    }
});

export const {
    deleteAccount,
    cPwd
} = myprofile.actions;

export default myprofile.reducer;
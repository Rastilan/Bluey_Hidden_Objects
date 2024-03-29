import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    photo: '',
    userDocSnapshot: null,

};

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },

        setSignOutState: state => {
            state.name = null;
            state.email = null;
            state.photo = null;
        },

        setUserDocSnapshot: (state, action) => {
            state.userDocSnapshot = action.payload;
        },
    },
});

export const { setUserLoginDetails, setSignOutState, setUserDocSnapshot } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;
export const selectUserDocSnapshot = (state) => state.user.userDocSnapshot;

export default userSlice.reducer;
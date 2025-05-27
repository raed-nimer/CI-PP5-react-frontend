import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;  
    },
    resetUser: (state) => {
      state.user = null;
    }
  },
});

export const { loginUser, logoutUser, registerUser, resetUser } = UserSlice.actions;

export default UserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  streamToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.streamToken = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("refreshToken");
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    setStreamToken: (state, action) => {
      state.streamToken = action.payload;
    },
  },
});

export const { login, logout, updateUserProfile, setStreamToken } =
  authSlice.actions;

export default authSlice.reducer;

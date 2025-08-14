import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores the user object (e.g., name, email, ID)
  token: null, // Stores the authentication token (e.g., JWT)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // This reducer handles a successful login
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // This reducer handles a logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken"); // Clean up local storage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
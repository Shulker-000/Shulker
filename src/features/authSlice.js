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
      // Clean up local storage
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("refreshToken");
    },
    // This new reducer updates the user object in both state and local storage
    updateUserProfile: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;

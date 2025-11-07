import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiKey: null,
  isLoggedIn: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.apiKey = action.payload;
      state.isLoggedIn = true;
    },

    logoutAdmin: (state) => {
      state.apiKey = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;

export const selectIsAdminLoggedIn = (state) => state.admin.isLoggedIn;
export const selectAdminApiKey = (state) => state.admin.apiKey;

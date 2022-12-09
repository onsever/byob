import { createSlice } from "@reduxjs/toolkit";
import { deleteData, storeData } from "../../utils/asyncStorage";

const initialState = {
  user: null,
  order: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      storeData("user", action.payload);
    },
    logout: (state, action) => {
      state.user = null;
      deleteData("user");
    },
    storeOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state, action) => {
      state.order = null;
    },
  },
});

export default authSlice.reducer;

export const { login, logout, storeOrder, clearOrder } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectOrder = (state) => state.auth.order;

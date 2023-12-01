import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setAuth(state, action) {
      return action.payload;
    },
    clearAuth() {
      return null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const loginUser = (credentials) => {
  return async (disptach) => {
    const user = await loginService.login(credentials);
    disptach(setAuth(user));
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    blogService.setToken(user.token);
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearAuth());
    window.localStorage.clear();
    blogService.setToken(null);
  };
};

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const loginUser = (credentials) => {
  return async (disptach) => {
    const user = await loginService.login(credentials);
    disptach(setUser(user));
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    blogService.setToken(user.token);
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(clearUser());
    window.localStorage.clear();
    blogService.setToken(null);
  };
};

export default userSlice.reducer;

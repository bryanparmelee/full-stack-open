import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    appendUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setUsers, appendUser } = usersSlice.actions;

export const initializeUsers = () => {
  return async (disptach) => {
    const users = await usersService.getAll();
    disptach(setUsers(users));
  };
};

export default usersSlice.reducer;

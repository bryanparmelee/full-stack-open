import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export default store;

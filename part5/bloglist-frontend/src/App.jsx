import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import blogService from "./services/blogs";

import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { logoutUser } from "./reducers/userReducer";

import Notifcation from "./components/Notifcation";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const handleSignout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notifcation />
      {user ? (
        <>
          {`${user.name} logged in`}
          <button type="button" onClick={handleSignout}>
            Sign Out
          </button>
          <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm />
          </Toggleable>
          <BlogList />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;

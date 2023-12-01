import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import blogService from "./services/blogs";

import { initializeBlogs } from "./reducers/blogReducer";
import { setAuth } from "./reducers/authReducer";
import { logoutUser } from "./reducers/authReducer";

import Notifcation from "./components/Notifcation";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setAuth(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const currentUser = useSelector((state) => state.auth);

  const handleSignout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="app">
      {currentUser && (
        <div className="navbar">
          <Link to="/blogs">blogs</Link>
          <Link to="/users">users</Link>
          {`${currentUser.name} logged in`}
          <button type="button" onClick={handleSignout}>
            Sign Out
          </button>
        </div>
      )}
      <Notifcation />
      <h2>blog app</h2>
      <Routes>
        <Route path="/" element={currentUser ? <BlogList /> : <LoginForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default App;

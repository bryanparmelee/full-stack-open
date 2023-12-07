import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Box,
} from "@mui/material";

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
    <Container>
      {currentUser && (
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-around" }}>
            <Button color="inherit" component={Link} to="/blogs">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>

            <Button color="inherit" onClick={handleSignout}>
              Sign Out
            </Button>
            <Typography>{`${currentUser.name} logged in`}</Typography>
          </Toolbar>
        </AppBar>
      )}
      <Notifcation />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography variant="h2">blog app</Typography>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <BlogList /> : <LoginForm />}
          />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;

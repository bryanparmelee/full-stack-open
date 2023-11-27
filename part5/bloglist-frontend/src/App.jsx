import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Notifcation from "./components/Notifcation";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";

import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUserName("");
      setPassword("");
    } catch (exception) {
      dispatch(
        setNotification(
          { message: "Incorrect username or password", type: "error" },
          5
        )
      );
    }
  };

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService
      .create(blogObject)
      .then((newBlog) => {
        setBlogs(blogs.concat({ ...newBlog, user: user }));
        dispatch(
          setNotification(
            {
              message: `a new blog "${newBlog.title}" by ${newBlog.author} has been added`,
              type: "notification",
            },
            5
          )
        );
      })
      .catch((error) => {
        dispatch(
          setNotification(
            { message: "Failed to create new blog.", type: "error" },
            5
          )
        );
      });
  };

  const handleLike = (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id);

    const updateBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    blogService
      .update(updateBlog)
      .then((returnedBlog) => {
        setBlogs(
          blogs
            .map((blog) => (blog.id !== id ? blog : returnedBlog))
            .sort((a, b) => b.likes - a.likes)
        );
        dispatch(
          setNotification(
            {
              message: `You liked "${returnedBlog.title}" by ${returnedBlog.author}`,
              type: "notification",
            },
            5
          )
        );
      })
      .catch((error) => {
        dispatch(
          setNotification(
            {
              message: `Blog "${blogToUpdate.title}" was already removed from server`,
              type: "error",
            },
            5
          )
        );
      });
  };

  const deleteBlog = (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      blogService.remove(blogObject).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        dispatch(
          setNotification({ message: "Blog removed", type: "notification" }, 5)
        );
      });
    }
  };

  const handleSignout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const blogsList = () => (
    <>
      <div>
        {`${user.name} logged in`}
        <button type="button" onClick={handleSignout}>
          Sign Out
        </button>
      </div>
      <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={deleteBlog}
          handleLike={() => handleLike(blog.id)}
        />
      ))}
    </>
  );

  return (
    <div>
      <h2>Blogs</h2>
      <Notifcation />
      {user ? (
        blogsList()
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUserName(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      )}
    </div>
  );
};

export default App;

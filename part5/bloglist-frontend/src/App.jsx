import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Notifcation from "./components/Notifcation";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
      setErrorMessage("Incorrect username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url,
      });
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} has been added`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setBlogs(blogs.concat(newBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      setErrorMessage("Failed to create blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleSignout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => (
    <>
      <h2>Log in</h2>
      {errorMessage && <Notifcation message={errorMessage} type="error" />}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );

  // const createBlogForm = () => {
  //   <>
  //     <h2>Create new</h2>
  //     <form onSubmit={handleCreateBlog}>
  //       <div>
  //         title:
  //         <input
  //           type="text"
  //           value={title}
  //           name="Title"
  //           onChange={({ target }) => setTitle(target.value)}
  //         />
  //       </div>
  //       <div>
  //         author:
  //         <input
  //           type="text"
  //           value={author}
  //           name="Author"
  //           onChange={({ target }) => setAuthor(target.value)}
  //         />
  //       </div>
  //       <div>
  //         url:
  //         <input
  //           type="text"
  //           value={url}
  //           name="Url"
  //           onChange={({ target }) => setUrl(target.value)}
  //         />
  //       </div>
  //       <button type="submit">Create blog</button>
  //     </form>
  //   </>;
  // };

  const blogsList = () => (
    <>
      <h2>blogs</h2>
      {notification && (
        <Notifcation message={notification} type="notification" />
      )}
      <p>{`${user.name} logged in`}</p>
      <button type="button" onClick={handleSignout}>
        Sign Out
      </button>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create blog</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return <div>{user ? blogsList() : loginForm()}</div>;
};

export default App;

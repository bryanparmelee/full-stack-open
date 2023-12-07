import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, deleteBlog, handleLike }) => {
  const [visible, setIsVisible] = useState(false);

  const { title, author, url, user, likes } = blog;

  const loggedInUser = JSON.parse(
    window.localStorage.getItem("loggedBlogAppUser")
  );

  const toggleVisibility = () => {
    setIsVisible(!visible);
  };

  const blogStyles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyles} className="blog">
      {title} {author}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible && (
        <div className="details">
          {url && url}
          <br />
          Likes {likes && likes} <button onClick={handleLike}>Like</button>
          <br />
          {user && user.username}
          <br />
          {loggedInUser && loggedInUser.username === user.username && (
            <button onClick={() => deleteBlog(blog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;

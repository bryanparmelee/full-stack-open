import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, deleteBlog }) => {
  const [visible, setIsVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const { title, author, url, user } = blog;

  const loggedInUser = JSON.parse(
    window.localStorage.getItem("loggedBlogAppUser")
  );

  const toggleVisibility = () => {
    setIsVisible(!visible);
  };

  const handleLike = () => {
    const blogToUpdate = {
      ...blog,
      likes: likes + 1,
    };

    blogService
      .update(blogToUpdate)
      .then((updatedBlog) => setLikes(updatedBlog.likes));
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

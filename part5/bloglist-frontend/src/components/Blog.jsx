import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const [visible, setIsVisible] = useState(false);

  const disptach = useDispatch();

  const { title, author, url, likes, user } = blog;

  const loggedInUser = JSON.parse(
    window.localStorage.getItem("loggedBlogAppUser")
  );

  const toggleVisibility = () => {
    setIsVisible(!visible);
  };

  const handleLike = () => {
    disptach(likeBlog(blog));
    disptach(
      setNotification(
        { message: `You liked "${blog.title}"`, type: "notification" },
        5
      )
    );
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      disptach(deleteBlog(blog));
      disptach(
        setNotification(
          {
            message: "Blog removed",
            type: "notification",
          },
          5
        )
      );
    }
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
            <button onClick={handleRemove}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;

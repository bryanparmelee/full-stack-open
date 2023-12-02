import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link, useParams } from "react-router-dom";

const Blog = () => {
  const disptach = useDispatch();

  const { id } = useParams();

  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) return null;

  const { title, author, url, likes, user, comments } = blog;

  const loggedInUser = JSON.parse(
    window.localStorage.getItem("loggedBlogAppUser")
  );

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

  return (
    <div className="blog">
      <h2> {`${title} by ${author}`}</h2>
      <Link to={`${url}`}>{url}</Link>
      <br />
      {likes && likes} Likes <button onClick={handleLike}>Like</button>
      <br />
      Added by {user && user.username}
      <br />
      {loggedInUser && loggedInUser.username === user.username && (
        <button onClick={handleRemove}>Remove</button>
      )}
      {comments.length > 0 && (
        <>
          <h3>comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Blog;

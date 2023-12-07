import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { Link, Button, Typography, Box } from "@mui/material";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";

import CommentList from "./CommentList";

const Blog = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) return null;

  const { title, author, url, likes, user } = blog;

  const loggedInUser = JSON.parse(
    window.localStorage.getItem("loggedBlogAppUser")
  );

  const handleLike = () => {
    disptach(likeBlog(blog));
    disptach(
      setNotification(
        { message: `You liked "${blog.title}"`, type: "success" },
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
            type: "success",
          },
          5
        )
      );
    }
    navigate("/blogs");
  };

  return (
    <>
      <Box
        sx={{
          width: 345,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          border: 4,
          borderColor: "primary.main",
          padding: 2,
        }}
      >
        <Typography variant="h5"> {`${title} by ${author}`}</Typography>
        <Typography>
          <Link
            color="inherit"
            underline="none"
            component={RouterLink}
            to={`${url}`}
          >
            {url}
          </Link>
        </Typography>
        {likes && likes} Likes{" "}
        <Button
          variant="contained"
          startIcon={<ThumbUpOffAltIcon />}
          onClick={handleLike}
        >
          Like
        </Button>
        <Typography>
          Added by{" "}
          <Link color="inherit" component={RouterLink} to={`/users/${user.id}`}>
            {user && user.username}
          </Link>
        </Typography>
        {loggedInUser && loggedInUser.username === user.username && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemove}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </Box>

      <Box>
        <CommentList blog={blog} />
      </Box>
    </>
  );
};

export default Blog;

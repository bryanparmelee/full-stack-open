import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const createNewBlog = (e) => {
    e.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    };
    setTitle("");
    setAuthor("");
    setUrl("");
    dispatch(createBlog(newBlog));
    dispatch(
      setNotification(
        {
          message: `A new blog "${newBlog.title}" by ${newBlog.author} has been created`,
          type: "success",
        },
        5
      )
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Create new</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="form"
          onSubmit={createNewBlog}
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: 200 }}
        >
          <TextField
            size="small"
            label="title"
            id="title"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            size="small"
            label="author"
            id="author"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />

          <TextField
            size="small"
            label="url"
            id="url"
            value={url}
            name="Url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="small"
          >
            Create blog
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogForm;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";
import { TextField, Button, Box } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";

const CommentForm = ({ blogId }) => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addComment({ content: content }, blogId));
    setContent("");
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="content"
          id="content"
          value={content}
          name="Content"
          placeholder="Add comment"
          onChange={({ target }) => setContent(target.value)}
        />
        <Button
          variant="contained"
          startIcon={<AddCommentIcon />}
          type="submit"
        >
          Post comment
        </Button>
      </Box>
    </>
  );
};

export default CommentForm;

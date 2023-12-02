import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";

const CommentForm = ({ blogId }) => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addComment({ content: content }, blogId));
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="content"
        type="text"
        value={content}
        name="Content"
        placeholder="Add comment"
        onChange={({ target }) => setContent(target.value)}
      />
      <button type="submit">Post comment</button>
    </form>
  );
};

export default CommentForm;

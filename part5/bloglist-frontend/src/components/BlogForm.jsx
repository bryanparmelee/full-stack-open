import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

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
          type: "notification",
        },
        5
      )
    );
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create blog</button>
      </form>
    </>
  );
};

export default BlogForm;

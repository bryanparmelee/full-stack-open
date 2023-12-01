import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Toggleable from "./Toggleable";
import BlogForm from "./BlogForm";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  const blogStyles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blogs) {
    return null;
  }

  return (
    <>
      <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm />
      </Toggleable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          return (
            <div key={blog.id} style={blogStyles}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          );
        })}
    </>
  );
};

export default BlogList;

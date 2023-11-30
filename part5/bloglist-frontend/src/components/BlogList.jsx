import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  if (!blogs) {
    return null;
  }

  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
    </>
  );
};

export default BlogList;

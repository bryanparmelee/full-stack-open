import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const { id } = useParams();

  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </>
  );
};

export default User;

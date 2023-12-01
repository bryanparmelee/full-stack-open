import { useDispatch, useSelector } from "react-redux";
import userService from "../services/users";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const users = useSelector((state) => state.users);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name} </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;

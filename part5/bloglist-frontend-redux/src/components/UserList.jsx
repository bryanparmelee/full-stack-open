import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/usersReducer";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Typography,
} from "@mui/material";

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const users = useSelector((state) => state.users);

  return (
    <Box sx={{ width: "full" }}>
      <Typography variant="h3">Users</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5">Username</Typography>{" "}
              </TableCell>
              <TableCell>
                <Typography variant="h5">Blogs Created</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link color="inherit" to={`/users/${user.id}`}>
                    <Typography variant="h6">{user.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography variant="h6" align="right">
                    {user.blogs.length}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;

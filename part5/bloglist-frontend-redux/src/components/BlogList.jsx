import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Toggleable from "./Toggleable";
import BlogForm from "./BlogForm";
import {
  Link,
  Box,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  if (!blogs) {
    return null;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm />
        </Toggleable>
      </Box>
      <TableContainer>
        <Table>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => {
                return (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link
                        color="inherit"
                        underline="none"
                        component={RouterLink}
                        to={`/blogs/${blog.id}`}
                      >
                        <Typography variant="h5">{`${blog.title}`}</Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {`${blog.user.username}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BlogList;

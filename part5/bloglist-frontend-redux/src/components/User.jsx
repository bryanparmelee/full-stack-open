import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const User = () => {
  const { id } = useParams();

  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h3">{user.username}</Typography>
      {user.blogs.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 2,
            borderColor: "primary.main",
          }}
        >
          <Typography variant="h5">added blogs</Typography>
          <List>
            {user.blogs.map((blog) => (
              <ListItem key={blog.id}>
                <ListItemText>
                  <Link
                    color="inherit"
                    component={RouterLink}
                    to={`/blogs/${blog.id}`}
                  >
                    <Typography variant="h6">{blog.title}</Typography>
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography variant="h6">This user has not added any blogs.</Typography>
      )}
    </Box>
  );
};

export default User;

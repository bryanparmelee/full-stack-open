import CommentForm from "./CommentForm";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const CommentList = ({ blog }) => {
  const { comments, id } = blog;
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5">Comments</Typography>
      <Box>
        <CommentForm blogId={id} />
      </Box>
      <Box>
        {comments.length > 0 && (
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemText primary={`${comment.content}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default CommentList;

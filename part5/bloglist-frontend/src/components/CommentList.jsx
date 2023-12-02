import CommentForm from "./CommentForm";

const CommentList = ({ blog }) => {
  const { comments, id } = blog;
  return (
    <>
      <h3>comments</h3>
      <CommentForm blogId={id} />
      {comments.length > 0 && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentList;

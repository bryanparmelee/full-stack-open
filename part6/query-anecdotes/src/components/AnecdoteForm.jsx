import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (error) => {
      dispatch({ type: "SET", payload: `${error.response.data.error}` });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({
        type: "SET",
        payload: `A new anecdote '${res.content}' has been created.`,
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

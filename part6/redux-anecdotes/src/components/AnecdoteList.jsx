import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter.length
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes;
  });

  const dispatch = useDispatch();

  const voteHandler = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`), 5);
  };

  return (
    <>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => {
          const { id, content, votes } = anecdote;
          return (
            <div key={id}>
              <div>{content}</div>
              <div>
                has {votes}
                <button onClick={() => voteHandler(anecdote)}>vote</button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default AnecdoteList;

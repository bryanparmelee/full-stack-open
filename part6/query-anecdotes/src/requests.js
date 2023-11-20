import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () =>
  axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
  };
  const result = await axios.post(baseUrl, newAnecdote);
  return result.data;
};

export const addVote = async (anecdote) => {
  const { id, votes } = anecdote;
  const updatedAnecdote = {
    ...anecdote,
    votes: votes + 1,
  };
  const result = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return result.data;
};

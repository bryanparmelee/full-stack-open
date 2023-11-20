import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdoteObj = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdoteObj);
  return response.data;
};

const addVote = async (anecdote) => {
  const { id, votes } = anecdote;
  const updatedAnecdote = {
    ...anecdote,
    votes: votes + 1,
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response.data;
};

export default { getAll, createNew, addVote };

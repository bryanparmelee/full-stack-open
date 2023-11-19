import { createSlice } from "@reduxjs/toolkit";
import anecoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdotes(state, action) {
      const { id } = action.payload;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      );
    },
  },
});

export const { updateAnecdotes, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecoteService.addVote(anecdote);
    dispatch(updateAnecdotes(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlogs(state, action) {
      const { id } = action.payload;
      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    },
    filterBlogs(state, action) {
      const { id } = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { appendBlog, setBlogs, updateBlogs, filterBlogs } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(blog);
    dispatch(updateBlogs(likedBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    blogService.remove(blog).then(dispatch(filterBlogs(blog)));
  };
};

export default blogSlice.reducer;

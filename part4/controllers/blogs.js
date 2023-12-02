const blogsRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware.js");
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments");
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("user")
    .populate("comments");
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", userExtractor, async (req, res) => {
  const body = req.body;

  const user = await User.findById(req.user);

  if (!body.title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!body.url) {
    return res.status(400).json({ message: "URL is required" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const blogWithUserDoc = await Blog.findById(savedBlog.id).populate("user");
  res.status(201).json(blogWithUserDoc);
});

blogsRouter.delete("/:id", userExtractor, async (req, res) => {
  if (!req.token) {
    return res.status(400).json({ error: "must be logged in" });
  }

  const blogToDelete = await Blog.findById(req.params.id);
  if (blogToDelete.user._id.toString() !== req.user) {
    return res
      .status(400)
      .json({ error: `Only the blog's creator can delete this blog.` });
  }

  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", userExtractor, async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  }).populate("user");
  res.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const body = req.body;
  const blog = await Blog.findById(req.params.id);

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(comment);
  await blog.save();
  const blogWithComment = blog.populate("comments");
  res.status(201).json(blogWithComment);
});

module.exports = blogsRouter;

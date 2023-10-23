const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Test blog 1",
    author: "Test author 1",
    url: "https://cats.com/",
  },
  {
    title: "Test blog 2",
    author: "Test author 2",
    url: "https://dogs.com/",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "This will be deleted soon.",
    author: "Delete me",
    url: "https://cats.com/",
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};

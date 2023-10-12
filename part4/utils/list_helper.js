const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.sort((a, b) => b.likes - a.likes)[0];
  const { title, author, likes } = favorite;
  return { title, author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

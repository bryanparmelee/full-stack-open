const _ = require("lodash");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

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

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, (blog) => blog.author);
  const authors = Object.keys(counts);
  const blogCount = Object.values(counts);
  const max = Math.max(...blogCount);
  const index = blogCount.indexOf(max);
  return {
    author: authors[index],
    blogs: blogCount[index],
  };
};

const mostLikes = (blogs) => {
  let totalLikes = {};
  blogs.map((blog) => {
    const { author, likes } = blog;
    if (!totalLikes[author]) {
      totalLikes[author] = likes;
    } else {
      totalLikes[author] += likes;
    }
  });

  const authors = Object.keys(totalLikes);
  const likes = Object.values(totalLikes);
  const max = Math.max(...likes);
  const index = likes.indexOf(max);
  return {
    author: authors[index],
    likes: likes[index],
  };
};

module.exports = {
  blogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

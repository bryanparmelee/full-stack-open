const { mostBlogs, blogs } = require("../utils/list_helper");

describe("most blogs", () => {
  test("returns author and blog count for author with most blogs", () => {
    const result = mostBlogs(blogs);
    console.log(`result: ${result}`);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
  test("returns title, author and likes of the blog with most likes", () => {
    const result = listHelper.favoriteBlog(listHelper.blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

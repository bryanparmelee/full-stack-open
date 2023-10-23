const { mostLikes, blogs } = require("../utils/list_helper");

describe("most likes", () => {
  test("returns author, total likes of author with most likes", () => {
    const result = mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const blog = {
  title: "This is only a test blog.",
  author: "Test Testerson",
  url: "cats.com",
  likes: 16,
  user: {
    username: "testguy",
  },
};

test("initally renders title, author but not URL, likes", () => {
  render(<Blog blog={blog} />);

  const element = screen.getByText("This is only a test blog. Test testerson", {
    exact: false,
  });
  expect(element).toBeDefined();
  expect(element).not.toHaveTextContent("cats.com");
  expect(element).not.toHaveTextContent("Likes");
});

test("likes and URL are shown when 'view' is clicked", async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Likes 16");
  expect(div).toHaveTextContent("cats.com");
});

test("likeHandler is called twice when 'like' is clicked twice", async () => {
  const mockHandler = jest.fn();
  const user = userEvent.setup();

  render(<Blog blog={blog} handleLike={mockHandler} />);

  const button = screen.getByText("view");
  await user.click(button);
  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("Blog form calls eventHandler with correct details when submited", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByPlaceholderText("Title");
  const author = screen.getByPlaceholderText("Author");
  const url = screen.getByPlaceholderText("url");
  const submitButton = screen.getByText("Create blog");

  await user.type(title, "Test blog");
  await user.type(author, "Test author");
  await user.type(url, "test.com");
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Test blog");
  expect(createBlog.mock.calls[0][0].author).toBe("Test author");
  expect(createBlog.mock.calls[0][0].url).toBe("test.com");
});

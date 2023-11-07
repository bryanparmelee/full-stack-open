import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

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
  const mockHandler = jest.fn();

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Likes 16");
  expect(div).toHaveTextContent("cats.com");
});

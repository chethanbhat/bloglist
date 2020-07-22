import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { prettyDom, fireEvent } from "@testing-library/dom";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";

test("renders blog contents", () => {
  const blog = {
    title: "Hello to Testing",
    url: "example.com",
    author: "Chethan Bhat",
    likes: 0,
  };
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("Hello to Testing");
});

test("Only blog title is visible unless toggled", () => {
  const blog = {
    title: "Hello to Testing",
    url: "example.com",
    author: "Chethan Bhat",
    likes: 0,
  };
  const component = render(<Blog blog={blog} />);
  expect(component.getByText(blog.title)).toBeVisible();
  expect(component.getByText(blog.url)).not.toBeVisible();
  expect(component.getByText(blog.author)).not.toBeVisible();
  expect(component.getByText(`Likes: ${blog.likes}`)).not.toBeVisible();
});

test("blog details are shown when button is toggled", () => {
  const blog = {
    title: "Hello to Testing",
    url: "example.com",
    author: "Chethan Bhat",
    likes: 0,
  };
  const component = render(<Blog blog={blog} />);
  fireEvent.click(component.getByText("View"));
  expect(component.getByText(blog.title)).toBeVisible();
  expect(component.getByText(blog.url)).toBeVisible();
  expect(component.getByText(blog.author)).toBeVisible();
  expect(component.getByText(`Likes: ${blog.likes}`)).toBeVisible();
});

test("When Like button is clicked, event handler is fired", () => {
  const blog = {
    title: "Hello to Testing",
    url: "example.com",
    author: "Chethan Bhat",
    likes: 0,
  };
  const updateLikes = jest.fn();
  const component = render(<Blog blog={blog} updateLikes={updateLikes} />);
  fireEvent.click(component.getByText("Like"));
  fireEvent.click(component.getByText("Like"));
  expect(updateLikes.mock.calls).toHaveLength(2);
});

test("<CreateBlog /> calls and updates its parent state on creating an new blog", () => {
  const submitBlog = jest.fn();
  const component = render(<CreateBlog submitBlog={submitBlog} />);
  const form = component.container.querySelector(".create-blog-form");
  const blogTitle = component.container.querySelector("#blog-title");
  const blogAuthor = component.container.querySelector("#blog-author");
  const blogUrl = component.container.querySelector("#blog-url");
  fireEvent.change(blogTitle, {
    target: { value: "Testing react apps is fun" },
  });
  fireEvent.change(blogAuthor, {
    target: { value: "Chethan Bhat" },
  });
  fireEvent.change(blogUrl, {
    target: { value: "https://testing-library.com/" },
  });
  fireEvent.submit(form);
  expect(submitBlog.mock.calls).toHaveLength(1);
  expect(submitBlog.mock.calls[0][0].title).toBe("Testing react apps is fun");
});

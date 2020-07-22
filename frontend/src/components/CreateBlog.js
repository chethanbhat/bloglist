import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

const CreateBlog = ({ submitBlog }) => {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      blog.title.length < 500 &&
      blog.url.length < 500 &&
      blog.author.length < 100
    ) {
      submitBlog(blog);
      setBlog({
        title: "",
        author: "",
        url: "",
      });
    }
  };

  return (
    <div className="my-3">
      <h3>Add a new blog</h3>
      <Form className="create-blog-form" onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label htmlFor="blog-title">Title: </Label>
          <Input
            type="text"
            id="blog-title"
            placeholder="Blog Title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="blog-author">Author: </Label>
          <Input
            type="text"
            id="blog-author"
            placeholder="Blog Author"
            value={blog.author}
            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="blog-url">URL: </Label>
          <Input
            type="text"
            id="blog-url"
            placeholder="Blog URL"
            value={blog.url}
            onChange={(e) => setBlog({ ...blog, url: e.target.value })}
          />
        </FormGroup>
        <Button color="success" id="submit-blog" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

CreateBlog.propTypes = {
  submitBlog: PropTypes.func.isRequired,
};

export default CreateBlog;

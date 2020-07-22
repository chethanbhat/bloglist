import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import {
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  Input,
  FormGroup,
} from "reactstrap";

const BlogPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  if (user) {
    blogService.setToken(user.token);
  }
  if (!blog) {
    return null;
  }
  const handleLikes = (blog) => {
    dispatch(likeBlog(blog));
  };
  const handleDelete = (blog) => {
    if (
      window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      dispatch(deleteBlog(blog));
      history.push("/");
    }
  };
  const submitComment = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog, comment));
    setComment("");
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="container">
      <Button
        className="my-3 d-block mx-auto"
        color="secondary"
        onClick={goBack}
      >
        Back
      </Button>
      <Card className="container">
        <h1 className="my-3">{blog.title}</h1>
        <h6 className="my-1">Added by {blog.user.name}</h6>
        <a className="my-1" href={blog.url}>
          {blog.url}
        </a>
        <div className="my-3">
          <span role="img" aria-label="likes">
            👍
          </span>{" "}
          {blog.likes}
          <Button
            color="warning"
            className="ml-5 like-blog"
            onClick={() => handleLikes(blog)}
          >
            Like
          </Button>
        </div>
        <p>
          Author: <strong>{blog.author}</strong>
        </p>
        {blog.user.username === user.username ? (
          <div>
            <Button
              color="danger"
              className="my-3"
              onClick={() => handleDelete(blog)}
            >
              Delete Blog
            </Button>
          </div>
        ) : null}
        <div className="my-5">
          <h3>
            Comments{" "}
            <span role="img" aria-label="comments">
              💬
            </span>{" "}
            ({blog.comments.length})
          </h3>
          <Form inline onSubmit={submitComment}>
            <FormGroup>
              <Input
                type="text"
                value={comment}
                placeholder="Your comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </FormGroup>

            <Button className="ml-2" type="submit">
              Add
            </Button>
          </Form>
          <ListGroup className="my-5">
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((comment, index) => (
                <ListGroupItem key={index}>{comment}</ListGroupItem>
              ))
            ) : (
              <p className="text-muted">Nothing yet...</p>
            )}
          </ListGroup>
        </div>
      </Card>
      <Button
        className="my-3 d-block mx-auto"
        color="secondary"
        onClick={goBack}
      >
        Back
      </Button>
    </div>
  );
};

export default BlogPage;

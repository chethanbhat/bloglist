import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  if (!user) {
    return null;
  }
  return (
    <div className="container">
      <h1 className="my-3">{user.name}</h1>
      <h3>Added Blogs</h3>
      <ListGroup className="my-3">
        {user.blogs.map((blog) => (
          <ListGroupItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroupItem>
        ))}
      </ListGroup>
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

export default User;

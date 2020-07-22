import React from "react";
import { Link } from "react-router-dom";
import { ListGroupItem } from "reactstrap";

const Blog = ({ blog, updateLikes, blogDelete }) => {
  return (
    <Link className="my-1" to={`/blogs/${blog.id}`}>
      <ListGroupItem className="blog">
        <div className="d-flex justify-content-between">
          <h6>
            {blog.title} by {blog.author}
          </h6>
          <div className="d-flex">
            <div className="mx-2">
              <span role="img" aria-label="likes">
                👍
              </span>{" "}
              {blog.likes}
            </div>
            <div className="mx-2">
              <span role="img" aria-label="comments">
                💬
              </span>{" "}
              {blog.comments.length}
            </div>
          </div>
        </div>
      </ListGroupItem>
    </Link>
  );
};

export default Blog;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Notification from "./Notification";
import LoginForm from "./LoginForm";
import Togglable from "./Togglable";

import blogService from "../services/blogs";
import { createBlog, likeBlog, deleteBlog } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/authReducer";

import { ListGroup } from "reactstrap";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  if (user) {
    blogService.setToken(user.token);
  }

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const createBlogRef = React.createRef();
  const login = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(credentials));
      setCredentials({
        username: "",
        password: "",
      });
    } catch (exception) {
      console.log("exception", exception);
      dispatch(createNotification(`Invalid Credentials`, true, 5));
    }
  };

  const submitBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog));
      dispatch(
        createNotification(
          `${newBlog.title} added successfully to bloglist`,
          false,
          5
        )
      );
      createBlogRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
    }
  };

  const updateLikes = (updatedBlog) => dispatch(likeBlog(updatedBlog));

  const blogDelete = (blogToBeDeleted) => dispatch(deleteBlog(blogToBeDeleted));

  const showBlogs = () => (
    <div className="container my-5">
      <Togglable buttonLabel="Add Blog" ref={createBlogRef}>
        <CreateBlog submitBlog={submitBlog} />
      </Togglable>
      <h2 className="mt-3">List of Blogs</h2>
      <ListGroup className="blogs my-3">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            blogDelete={blogDelete}
          />
        ))}
      </ListGroup>
    </div>
  );

  const showLogin = () => {
    return (
      <LoginForm
        login={login}
        credentials={credentials}
        setCredentials={setCredentials}
      />
    );
  };

  return (
    <div className="container">
      {notification ? <Notification notification={notification} /> : null}
      {user ? showBlogs() : showLogin()}
    </div>
  );
};

export default Home;

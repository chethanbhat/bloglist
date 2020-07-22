import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Users from "./components/Users";
import User from "./components/User";

import { initializeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { getUser } from "./reducers/authReducer";
import BlogPage from "./components/BlogPage";
import SignUp from "./components/SignUp";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <Router>
      <main>
        <Navigation />
        <h1 className="text-center my-3 px-3">Welcome to Bloglist App</h1>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/blogs/:id" component={BlogPage} />
          <Route exact path="/register" component={SignUp} />
        </Switch>
        <div className="footer bg-dark py-3">
          <p className="text-light text-center">
            Coded with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <a className="text-warning" href="https://chethanbhat.com">
              Chethan Bhat
            </a>
          </p>
        </div>
      </main>
    </Router>
  );
};

export default App;

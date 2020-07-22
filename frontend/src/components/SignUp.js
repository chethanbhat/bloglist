import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Notification from "./Notification";
import { signupUser } from "../reducers/registerReducer";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    password: "",
  });
  const user = useSelector((state) => state.user);
  const registationSuccess = useSelector((state) => state.register);
  const notification = useSelector((state) => state.notification);
  const history = useHistory();
  const dispatch = useDispatch();

  if (user) {
    history.push("/");
  }

  useEffect(() => {
    if (registationSuccess) {
      history.push("/");
    }
  }, [history, registationSuccess]);

  const register = (e) => {
    e.preventDefault();
    dispatch(signupUser(credentials));
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {notification ? <Notification notification={notification} /> : null}
      <Form onSubmit={register}>
        <FormGroup>
          <Label htmlFor="username">Name: </Label>
          <Input
            type="text"
            id="name"
            value={credentials.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="username">Username: </Label>
          <Input
            type="text"
            id="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password: </Label>
          <Input
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </FormGroup>
        <Button className="btn btn-dark" id="login-btn" type="submit">
          Register
        </Button>
        <div className="my-3">
          <a href="/">Already Registered? Click here to Login</a>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;

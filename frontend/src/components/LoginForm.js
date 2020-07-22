import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const LoginForm = ({ login, credentials, setCredentials }) => {
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={login}>
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
          Login
        </Button>
        <div className="my-3">
          <a href="/register">New User? Click here to register</a>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;

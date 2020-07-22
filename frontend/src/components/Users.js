import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Table, Button } from "reactstrap";

const Users = () => {
  const users = useSelector((state) => state.users);
  const history = useHistory();

  if (!users) {
    return null;
  }

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="container">
      <h1>Users</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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

export default Users;

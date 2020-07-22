import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../reducers/authReducer";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUser());
    history.push("/");
  };
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  const showNav = () => {
    return (
      <>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/users">Users</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            {`${user.name} is logged in`}{" "}
            <Button color="danger" className="ml-3" onClick={logout}>
              Logout
            </Button>
          </NavbarText>
        </Collapse>
      </>
    );
  };
  return (
    <div className="mb-5">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">BlogList</NavbarBrand>
        {user ? showNav() : null}
      </Navbar>
    </div>
  );
};

export default Navigation;

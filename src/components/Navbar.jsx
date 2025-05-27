import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";

import { useSelector } from "react-redux";

const MyNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.cartCount);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
          Powerhouse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="m-auto text-center">
            <Nav.Link as={NavLink} to="/" className="text-white">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/product" className="text-white">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="text-white">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="text-white">Contact</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-center">
            <Button
              as={NavLink}
              to="/cart"
              variant="outline-warning"
              className="m-2"
            >
              <i className="fa fa-cart-shopping me-1"></i> Cart ({cartCount})
            </Button>

            {user ? (
              <NavDropdown
                title={<span className="text-white">{user.first_name || "Account"}</span>}
                id="user-dropdown"
                align="end"
                className="ms-2"
              >
                <NavDropdown.Item as={NavLink} to="/profile">
                  <i className="fa fa-user-circle me-2"></i> Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/my-orders">
                  <i className="fa fa-box me-2"></i> My Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fa fa-sign-out-alt me-2"></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button
                  as={NavLink}
                  to="/login"
                  variant="outline-warning"
                  className="m-2"
                >
                  <i className="fa fa-sign-in-alt me-1"></i> Login
                </Button>
                <Button
                  as={NavLink}
                  to="/register"
                  variant="outline-warning"
                  className="m-2"
                >
                  <i className="fa fa-user-plus me-1"></i> Register
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

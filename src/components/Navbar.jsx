import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const MyNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cartCount, fetchCartCount } = useCart();
 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

   useEffect(() => {
    if (user) {
      fetchCartCount();
    }
  }, [user]);

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
          <div className="text-center">
            {user ? (
              <>
                <Button as={NavLink} to="/profile" variant="outline-info" className="m-2">
                  <i className="fa fa-user-circle me-1"></i> Profile
                </Button>
                <Button onClick={handleLogout} variant="outline-danger" className="m-2">
                  <i className="fa fa-sign-out-alt me-1"></i> Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={NavLink} to="/login" variant="outline-warning" className="m-2">
                  <i className="fa fa-sign-in-alt me-1"></i> Login
                </Button>
                <Button as={NavLink} to="/register" variant="outline-warning" className="m-2">
                  <i className="fa fa-user-plus me-1"></i> Register
                </Button>
              </>
            )}
            <Button as={NavLink} to="/cart" variant="outline-warning" className="m-2">
              <i className="fa fa-cart-shopping me-1"></i> Cart ({cartCount})
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

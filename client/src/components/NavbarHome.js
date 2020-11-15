import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'

function NavbarHome() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">ShopMaker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="#link">Customer</Nav.Link>
            <Nav.Link href="/login">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavbarHome;

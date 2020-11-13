import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom';
// import Navbar from 'react-bootstrap/Navbar'
import { Navbar, Nav } from 'react-bootstrap'

function App() {
  return (
    <>
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Product</Nav.Link>
      <Nav.Link href="#link">Pembelian</Nav.Link>
      <Nav.Link href="#link">Customer</Nav.Link>
      <Nav.Link href="#link">Logout</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
</>
  );
}

export default App;

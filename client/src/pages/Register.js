import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

function Register() {
  return (
    <Container fluid>
      <div
        className="d-flex w-100 align-items-center"
        style={{ height: '80vh' }}
      >
        <Form className="w-100">
          <Form.Group className="card-body">
            <h4 className="card-title mb-3 mt-1 ">Register</h4>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="formBasicuSERNAME">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" />
            </Form.Group>
            <Button variant="primary" className="w-100" type="submit">
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
}

export default Register;

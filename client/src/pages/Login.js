import React from 'react';
import { Form, Button } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

function Login() {
  return (
    <>
      <Form className="container card col-5">
        <Form.Group className="card-body">
          <Image src="../assets/web.svg" className="card-img-top" />
          <h2 className="card-title mb-3 mt-1">ShopMaker</h2>
          <p>Please fill in this form to create an account.</p>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>EnterPassword</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>

        <Form.Group className="card-body">
          <p>Don't have account? Please register</p>
          <Button variant="secondary" type="submit">
            Register
          </Button>
        </Form.Group>

      </Form>
    </>
  );
}

export default Login;

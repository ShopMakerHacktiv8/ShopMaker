import React from 'react'
import { Form, Button } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

function Register() {
  return (
    <>
      <Form className='container card col-5'>
        <Form.Group className='card-body'>
          <h2 class='card-title mb-3 mt-1'>Registration ShopMaker</h2>
          <p>Please fill in this form to create an account.</p>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' />
          </Form.Group>

          <Form.Group controlId='formBasicuSERNAME'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' placeholder='Enter username' />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>EnterPassword</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default Register

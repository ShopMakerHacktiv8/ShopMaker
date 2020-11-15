import React, { useEffect, useState } from 'react';
import {Button, Form, Container, Col, Row } from 'react-bootstrap'
import axios from 'axios'

function Home() {
  const [token, setToken] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postal_code, setPostal_code] = useState("")
  const [total, setTotal] = useState(20000)
  // useEffect(() => {
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:4000/products/buy',
  //   })
  //     .then(data => {
  //       setToken(data.data.token)
  //       console.log(data.data.token, "<<<<<<<<<<<<<token");
  //     })
  //     .catch(err => { return err })
  // }, [])

  function pay(name, phone, address, city, postal_code, total) {
      console.log(name, phone, address, city, postal_code, total, "<<<<<<<<<<<<<<INPUT ASHUP");
    axios({
      method: 'post',
      url: 'http://localhost:4000/products/buy',
      data: {
        name, phone, address, city, postal_code, total
      }
    })
      .then(data => {
        setToken(data.data.token)
        console.log(data.data.token, "<<<<<<<<<<<<<token")
        window.snap.pay(token)
      })
      .catch(err => { return err })
  }

  return (
    <>
      <Container>
        <Form onSubmit={(e) => {
          e.preventDefault()
          console.log("Pay Me!")
          pay(name, phone, address, city, postal_code, total)
          return false
        }}
        >
          <h2 className='mb-3 mt-5'>Payment Data</h2>
          <p>Please fill your personal information to process the payment</p>
          <Row>
            <Col sm='12'>
              <Form.Group controlId='form.email'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter your full name'
                  name='name' 
                  onChange={(event) => {
                    event.preventDefault()
                    setName(event.target.value)
                }}/>
              </Form.Group>
            </Col>

            <Col sm='6'>
              <Form.Group controlId='form.name'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your address'
                  name='name'
                  onChange={(event) => {
                    event.preventDefault()
                    setAddress(event.target.value)
                }}
                />
              </Form.Group>
            </Col>

            <Col sm='6'>
              <Form.Group controlId='form.city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='city'
                  placeholder='Enter Your City'
                  name='city'
                  onChange={(event) => {
                    event.preventDefault()
                    setCity(event.target.value)
                }}
                />
              </Form.Group>
            </Col>

            <Col sm='6'>
              <Form.Group controlId='form.postal_code'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter your postal code'
                  name='postal_code'
                  onChange={(event) => {
                    event.preventDefault()
                    setPostal_code(event.target.value)
                }}
                />
              </Form.Group>
            </Col>

            <Col sm='6'>
              <Form.Group controlId='form.phone'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='phone'
                  placeholder='Enter phone number'
                  name='phone'
                  onChange={(event) => {
                    event.preventDefault()
                    setPhone(event.target.value)
                }}
                />
              </Form.Group>
            </Col>

            <Col sm='12'>
              <Form.Group controlId='form.total'>
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type='number'
                  name='total'
                  disabled="true"
                  value={total}
                />
              </Form.Group>
            </Col>
          </Row>

          <center><Button variant='primary' type='submit'>
            Pay!
        </Button></center>
        </Form>
      </Container>
    </>
  );
}

export default Home;

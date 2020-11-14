import React from 'react'
import { Col, Container, Image, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={12}>
          <h1 className='text-center mt-5'>
            Create an Online Shop <br /> You're Proud Of
          </h1>
        </Col>
        <Col sm={12} className='d-flex justify-content-center mt-3'>
          <Button variant='primary' as={Link} to='/register'>
            Get Started
          </Button>
        </Col>
        <Col sm={12} className='d-flex justify-content-center mt-4'>
          <Image src={'./assets/web.svg'} className='w-50 pl-5 pr-5' fluid />
        </Col>
      </Row>
    </Container>
  )
}

export default LandingPage

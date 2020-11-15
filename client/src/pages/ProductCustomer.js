import React from 'react';
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap';

function ProductCustomer() {
  return (
    <Container fluid>
      <Row className="md-12">
        <Col className="col-12 justify-content-center">
          <Image src={'./assets/macbook2.jpg'} className="w-100" fluid></Image>
        </Col>
        <Container>
          <Col className="pt-4 col-12 justify-content-center">
            <h5>Macbook</h5>
          </Col>
          <Col className="col-12 justify-content-center">
            <h6>Rp 20.000.000</h6>
          </Col>
          <Col className="col-12 justify-content-center">
            <p>Macbook Pro Macbook Pro Macbook Pro Macbook Pro</p>
          </Col>
          <Col className="col-12 d-flex justify-content-center">
            <Button variant="outline-primary" size="sm">
              Add to Cart
            </Button>
          </Col>
        </Container>
      </Row>
    </Container>
  );
}

export default ProductCustomer;

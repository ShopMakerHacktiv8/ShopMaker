import React from 'react';
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap';

function CartCustomer() {
  return (
    <Container fluid>
      <Card className="mt-2">
        <Row className="md-12">
          <Col xs="6" md="4">
            <Image
              src={'./assets/macbook2.jpg'}
              className="w-100"
              fluid
            ></Image>
          </Col>
          <Col className="">
            <Col xs="6" className="col-12 justify-content-center">
              <p>Macbook</p>
            </Col>
            <Col className="col-12 justify-content-center">
              <p>Rp 20.000.000</p>
            </Col>
            <Col className="col-12 justify-content-center">
              <p>Qty: </p>
              {/* <div className="input-group">
              <button oclassName="fa fa-minus fa-inverse fa-2x"></button>
          <input type="text" className="number" ></input>
          <button className="fa fa-plus fa-inverse fa-2x"></button>
              </div> */}
            </Col>
            <Col className="col-12 d-flex justify-content-center"></Col>
          </Col>
        </Row>
      </Card>
      <Button variant="outline-primary" size="sm">
        Payment
      </Button>
    </Container>
  );
}

export default CartCustomer;

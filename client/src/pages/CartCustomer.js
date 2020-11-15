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
              className="w-100 mt-2"
              fluid
            ></Image>
          </Col>
          <Col className="">
            <Col xs="6" className=" mt-2 col-12 justify-content-center">
              <p style={{ fontSize: 20 }}>Macbook</p>
            </Col>
            <Col className="col-12 justify-content-center">
              <p style={{ fontSize: 10 }}>Rp 20.000</p>
            </Col>
            <Col className="col-12 justify-content-center">
              <div className="input-group">
                <p className="mr-2">Qty: </p>
                <Button
                  size="sm"
                  style={{ width: '20px', height: '20px', padding: '0px 0px' }}
                >
                  -
                </Button>
                <label className="ml-2 mr-2">2</label>
                <Button
                  size="sm"
                  style={{ width: '20px', height: '20px', padding: '0px 0px' }}
                >
                  +
                </Button>
              </div>
            </Col>
            <Col className="col-12 justify-content-end">
              <p>Total: Rp 40.000</p>
            </Col>
          </Col>
        </Row>
      </Card>
      <Card className="mt-2">
        <Row className="md-12">
          <Col xs="6" md="4">
            <Image
              src={'./assets/macbook2.jpg'}
              className="w-100 mt-2"
              fluid
            ></Image>
          </Col>
          <Col className="">
            <Col xs="6" className=" mt-2 col-12 justify-content-center">
              <p style={{ fontSize: 20 }}>Macbook</p>
            </Col>
            <Col className="col-12 justify-content-center">
              <p style={{ fontSize: 10 }}>Rp 20.000</p>
            </Col>
            <Col className="col-12 justify-content-center">
              <div className="input-group">
                <p className="mr-2">Qty: </p>
                <Button
                  size="sm"
                  style={{ width: '20px', height: '20px', padding: '0px 0px' }}
                >
                  -
                </Button>
                <label className="ml-2 mr-2">1</label>
                <Button
                  size="sm"
                  style={{ width: '20px', height: '20px', padding: '0px 0px' }}
                >
                  +
                </Button>
              </div>
            </Col>
            <Col className="col-12 justify-content-end">
              <p>Total: Rp 20.000</p>
            </Col>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col className="col-12 d-flex justify-content-end mt-2">
          Total: Rp 60.000
        </Col>
      </Row>

      <Button variant="outline-primary" block className="mt-2" size="sm">
        Payment
      </Button>
    </Container>
  );
}

export default CartCustomer;

import React from 'react';
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap'

function Home() {
  return (
    <Container fluid>
      <Row>
        <Col className="md-6">
          <Card className="shadow p-4 mt-4" style={{ width: '15rem' }}>
            <Row className="col-12 justify-content-center">
              <Image src={"./assets/macbook.jpg"}></Image>
            </Row>
            <Row className="col-12 justify-content-center">
              <h5>Macbook</h5>        
            </Row>
            <Row className="col-12 justify-content-center">
              <h6>Rp 20.000.000</h6>
            </Row>
            <Row className="col-12 justify-content-center">
              <Button class="btn btn-sm btn-outline-info">View</Button>
            </Row>
          </Card>
        </Col>     
        <Col className="md-6">
          <Card className="shadow p-4 mt-4" style={{ width: '15rem' }}>
            <Row className="col-12 justify-content-center">
              <Image src={"./assets/macbook.jpg"}></Image>
            </Row>
            <Row className="col-12 justify-content-center">
              <h5>Macbook</h5>        
            </Row>
            <Row className="col-12 justify-content-center">
              <h6>Rp 20.000.000</h6>
            </Row>
            <Row className="col-12 justify-content-center">
              <Button class="btn btn-sm btn-outline-info">View</Button>
            </Row>
          </Card>
        </Col>     
        <Col className="md-6">
          <Card className="shadow p-4 mt-4" style={{ width: '15rem' }}>
            <Row className="col-12 justify-content-center">
              <Image src={"./assets/macbook.jpg"}></Image>
            </Row>
            <Row className="col-12 justify-content-center">
              <h5>Macbook</h5>        
            </Row>
            <Row className="col-12 justify-content-center">
              <h6>Rp 20.000.000</h6>
            </Row>
            <Row className="col-12 justify-content-center">
              <Button class="btn btn-sm btn-outline-info">View</Button>
            </Row>
          </Card>
        </Col>     
        <Col className="md-6">
          <Card className="shadow p-4 mt-4" style={{ width: '15rem' }}>
            <Row className="col-12 justify-content-center">
              <Image src={"./assets/macbook.jpg"}></Image>
            </Row>
            <Row className="col-12 justify-content-center">
              <h5>Macbook</h5>        
            </Row>
            <Row className="col-12 justify-content-center">
              <h6>Rp 20.000.000</h6>
            </Row>
            <Row className="col-12 justify-content-center">
              <Button class="btn btn-sm btn-outline-info" href="/productCustomer">View</Button>
            </Row>
          </Card>
        </Col>     
        
      </Row>
    </Container>
   
  );
}

export default Home;

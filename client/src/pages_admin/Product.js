import React from 'react';
import { Card, CardDeck, Button, CardGroup } from 'react-bootstrap'

function Product() {
  return (
    <>
    <CardGroup className="col-5">
      <Button variant="primary">
          Add Product
      </Button>
    </CardGroup>
    <CardDeck>
      <Card>
        <Card.Body>
          <Card.Title>Laptop Asus</Card.Title>
          <Card.Text>
            Laptop Asus Laptop Asus Laptop Asus Laptop Asus Laptop Asus Laptop Asus Laptop Asus Laptop Asus
          </Card.Text>
        </Card.Body>
        <CardGroup className="col-1">
          <Button variant="primary">
              Edit
          </Button>
          <Button variant="danger">
              Delete
          </Button>
        </CardGroup>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Mouse</Card.Title>
          <Card.Text>
            Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse Mouse 
          </Card.Text>
        </Card.Body>
        <CardGroup className="col-1">
          <Button variant="primary">
              Edit
          </Button>
          <Button variant="danger">
              Delete
          </Button>
        </CardGroup>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Keyboard</Card.Title>
          <Card.Text>
            Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard Keyboard 
          </Card.Text>
        </Card.Body>
        <CardGroup className="col-1">
          <Button variant="primary">
              Edit
          </Button>
          <Button variant="danger">
              Delete
          </Button>
        </CardGroup>
      </Card>
    </CardDeck>
</>
  );
}

export default Product;

import React from 'react'
import {Card, CardDeck} from 'react-bootstrap'

function Home() {
  return (
    <>
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>Incoming Order</Card.Title>
            <Card.Text>
              Incoming Order Incoming Order Incoming Order Incoming Order Incoming Order
          </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Ready to Ship</Card.Title>
            <Card.Text>
              Ready to Ship Ready to Ship Ready to Ship Ready to Ship Ready to Ship Ready to Ship
          </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Sedang dikirim</Card.Title>
            <Card.Text>
              Sedang dikirim Sedang dikirim Sedang dikirim Sedang dikirim Sedang dikirim
          </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </>
  );
}

export default Home;

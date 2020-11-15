import React from 'react'
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const ItemCard = ({ item }) => {
  const { shopId } = useParams()
  return (
    <Col xs='6' md='4'>
      <Card>
        <Card.Img variant='top' src={item.image_url} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>Rp. {item.price}</Card.Text>
          {/* <div className='d-flex justify-content-between'> */}
          <Button
            className='w-100'
            variant='primary'
            size='sm'
            as={Link}
            to={`/${shopId}/product/${item.id}`}
          >
            View
          </Button>
          {/* <Button variant='primary' size='sm'>
              Add
            </Button> */}
          {/* </div> */}
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ItemCard

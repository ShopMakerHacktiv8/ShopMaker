import React from 'react'
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const ItemCard = ({ item }) => {
  const { shopId } = useParams()
  return (
    <Col xs='12' md='6' className='my-2'>
      <Card>
        <Card.Img
          variant='top'
          src={item.image_url}
          style={{ objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            Rp. {item.price.toLocaleString('en-US').replaceAll(',', '.')}
          </Card.Text>
          <Button
            className='w-100'
            variant='primary'
            size='sm'
            as={Link}
            to={`/${shopId}/product/${item.id}`}
          >
            View
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default ItemCard

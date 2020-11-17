import React from 'react'
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const ItemCard = ({ item }) => {
  const { shopId } = useParams()
  return (
    <Col xs='12' md='6' className='mt-3 mb-2'>
      <LinkContainer to={`/${shopId}/product/${item.id}`}>
        <Card className='shadow'>
          <Card.Img
            variant='top'
            src={item.image_url}
            style={{ objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <div className='d-flex align-items-center'>
              <Card.Text className='bg-light my-0 mr-2 p-1 rounded'>
                Rp. {item.price.toLocaleString('en-US').replaceAll(',', '.')}
              </Card.Text>
              {item.stock ? (
                <Card.Text className='bg-success text text-white my-0 p-1 rounded'>
                  In Stock ({item.stock} items)
                </Card.Text>
              ) : (
                <Card.Text className='bg-danger text text-white my-0 p-1 rounded'>
                  Out of stock
                </Card.Text>
              )}
            </div>
          </Card.Body>
        </Card>
      </LinkContainer>
    </Col>
  )
}

export default ItemCard

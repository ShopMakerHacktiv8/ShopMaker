import React from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const ItemCard = ({ item }) => {
  const { shopId } = useParams()
  return (
    <Col xs='12' sm='6' md='4' className='mt-3 mb-2'>
      <LinkContainer to={`/${shopId}/product/${item.id}`}>
        <div className='shadow border'>
          <Row>
            <Col xs='4' style={{ paddingRight: 0 }}>
              <Image
                variant='top'
                src={item.image_url}
                style={{ objectFit: 'cover' }}
                width='100%'
                height='100px'
              />
            </Col>

            <Col xs='8'>
              <div
                style={{ height: '100px' }}
                className='d-flex flex-column justify-content-center'
              >
                <Card.Text className='my-0' style={{ fontSize: '16px' }}>
                  {item.name}
                </Card.Text>

                <Card.Text className='my-0'>
                  Rp. {item.price.toLocaleString('en-US').replaceAll(',', '.')}
                </Card.Text>
                {item.stock ? (
                  <Card.Text className=' text my-0'>
                    In Stock ({item.stock} items)
                  </Card.Text>
                ) : (
                  <Card.Text className=' text text-danger my-0'>
                    Out of stock
                  </Card.Text>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </LinkContainer>
    </Col>
  )
}

export default ItemCard

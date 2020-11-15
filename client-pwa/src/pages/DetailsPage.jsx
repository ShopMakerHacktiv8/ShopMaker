import React, { useEffect } from 'react'
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetailsProduct } from '../store/actions/productActions'

const DetailsPage = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const { product, loading, errors } = useSelector(
    (state) => state.productDetailsReducer
  )

  useEffect(() => {
    dispatch(getDetailsProduct(productId))
  }, [])

  return (
    <Container fluid className='w-100 px-0'>
      {product.name && (
        <Row className='md-12'>
          <Col className='col-12'>
            <Image src={product.image_url} className='w-100' fluid></Image>
          </Col>
          <Container>
            <Col className='pt-4 col-12'>
              <h5>{product.name}</h5>
            </Col>
            <Col className='col-12'>
              <p>Rp {product.price}</p>
            </Col>
            <Col className='col-12'>
              <p>{product.description}</p>
            </Col>
            <Col className='col-12'>
              {product.stock ? (
                <p>Stock: {product.stock}</p>
              ) : (
                <p className='text text-danger'>Out of stock</p>
              )}
            </Col>
            <Col className='col-12'>
              <Button
                variant='primary'
                className='w-100'
                disabled={!product.stock}
              >
                Buy
              </Button>
            </Col>
          </Container>
        </Row>
      )}
    </Container>
  )
}

export default DetailsPage

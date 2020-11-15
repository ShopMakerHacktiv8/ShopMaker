import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getDetailsProduct } from '../store/actions/productActions'

const DetailsPage = () => {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const { user } = useSelector((state) => state.userDetailsReducer)

  const { product, loading, errors } = useSelector(
    (state) => state.productDetailsReducer
  )

  const [cart, setCart] = useState({ quantity: 0, total: 0 })

  useEffect(() => {
    dispatch(getDetailsProduct(productId))
  }, [])

  const addQuantity = () => {
    setCart({
      ...cart,
      quantity: cart.quantity + 1,
      total: (cart.quantity + 1) * product.price,
    })
  }

  const substractQuantity = () => {
    setCart({
      ...cart,
      quantity: cart.quantity - 1,
      total: (cart.quantity - 1) * product.price,
    })
  }

  return (
    <Container fluid className='w-100 px-0'>
      {product.name && (
        <Row className='md-12'>
          <Col className='col-12'>
            <Image src={product.image_url} className='w-100' fluid></Image>
          </Col>
          <Container>
            <Col className='pt-4 col-12'>
              <h4>{product.name}</h4>
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
            <Col className='col-12 d-flex justify-content-center align-items-center'>
              <Button
                size='sm'
                style={{ width: '35px', height: '35px', padding: '0px 0px' }}
                onClick={substractQuantity}
                disabled={!cart.quantity}
              >
                -
              </Button>
              <div className='ml-2 mr-2' style={{ fontSize: '18px' }}>
                {cart.quantity}
              </div>
              <Button
                size='sm'
                style={{ width: '35px', height: '35px', padding: '0px 0px' }}
                onClick={addQuantity}
                disabled={cart.quantity === product.stock}
              >
                +
              </Button>
            </Col>
            <Col className='col-12 d-flex justify-content-center mt-2'>
              <p>Total: Rp. {cart.total}</p>
            </Col>
            <Col className='col-12'>
              <Button
                variant='primary'
                className='w-100'
                disabled={!product.stock || !cart.quantity}
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

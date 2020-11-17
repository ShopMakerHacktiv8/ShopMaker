import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getDetailsProduct } from '../store/actions/productActions'
import axios from '../config/axios'
import { addOrderHistory } from '../store/actions/orderActions'
import Loader from '../components/Loader'

const DetailsPage = () => {
  const [token, setToken] = useState('')
  const { productId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const { shopId } = useParams()

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

  const handleBuy = () => {
    if (user) {
      pay()
    } else {
      history.push(`/${shopId}/payment`)
    }
  }

  const pay = () => {
    axios({
      method: 'post',
      url: `/clients/${shopId}/buy`,
      data: {
        name: user.name,
        phone: user.phone,
        address: user.address,
        total: cart.total,
        product_id: productId,
        quantity: cart.quantity,
      },
    })
      .then((data) => {
        setToken(data.data.token)
        console.log(data.data.token, '<<<<<<<<<<<<<token')
        dispatch(
          addOrderHistory({
            product: product.name,
            price: product.price,
            quantity: cart.quantity,
            total: cart.total,
            address: user.address,
          })
        )
        window.snap.pay(data.data.token)
      })
      .catch((err) => {
        return err
      })
  }

  return (
    <Container fluid className='w-100 pt-5'>
      {loading && <Loader />}
      {product.name && (
        <Row className='md-12 mt-5'>
          <Col className='col-12'>
            <Image src={product.image_url} className='w-100' fluid></Image>
          </Col>
          <Col className='pt-4 col-12'>
            <h4>{product.name}</h4>
          </Col>
          <Col className='col-12'>
            <div className='d-flex align-items-center'>
              <p className='p-1 bg-light rounded mr-2'>
                Rp {product.price.toLocaleString('en-US').replaceAll(',', '.')}
              </p>
              {product.stock ? (
                <p className='bg-success p-1 text text-white rounded'>
                  In Stock ({product.stock})
                </p>
              ) : (
                <p className='bg-danger p-1 text text-white rounded'>
                  Out of stock
                </p>
              )}
            </div>
          </Col>
          <Col className='col-12'>
            <p>{product.description}</p>
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
          <Col className='col-12 mb-3'>
            <Button
              variant='primary'
              className='w-100'
              disabled={!product.stock || !cart.quantity}
              onClick={handleBuy}
            >
              Buy
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default DetailsPage

import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row, Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { listCart } from '../store/actions/cartActions';


export default function Order() {
  const dispatch = useDispatch()
  const { carts, loading, error } = useSelector(
    state => state.cartListReducer
  )

  useEffect(() => {
    dispatch(listCart())
  }, [])
  return (
    <Container>
      {/* <h1>xixixi</h1> */}
      {/* { JSON.stringify(carts)} */}
      <h3 className="mt-5 d-flex justify-content-start">Order History</h3>
      <Row>
        
        { carts && carts.map(cart => (
          <Col sm="12" key={cart.id}>
            <Card className="p-2 shadow-sm my-2 rounded">
              <Row>
                <Col sm="3">
                  <Image height="150" src={ cart.Product.image_url} width="100%" style={{ objectFit: "cover" }} />
    
                </Col>
                
                <Col sm="4">
                  <text className="text-muted">Username</text>
                  <h4 className="mt-auto">{cart.user_name}</h4>
                  <small className="text-muted">Address</small>
                  <p>{cart.user_address}</p>
                  <small className="text-muted">Phone</small>
                  <p>{cart.user_phone} </p>
                </Col>

                <Col sm="4">
                  <small className="text-muted">Product Name</small>
                  <p>{cart.Product.name}</p>
                  <p>Total: { cart.quantity } x Rp {cart.Product.price.toLocaleString("en-US").replaceAll(",", ".")} <h5>
                  Rp {(cart.quantity * cart.Product.price).toLocaleString("en-US").replaceAll(",", ".")}
                    </h5> </p>
                </Col>
    
                <Col sm="1">
                  <div className="d-flex flex-column align-items-end justify-content-between" style={{ height: "150px"}}>
                  </div>
                </Col>
    
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      

    </Container>
  )
}

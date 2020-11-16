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
      <h1>xixixi</h1>
      {/* { JSON.stringify(carts)} */}
        {/* { carts && carts.map(cart => (
          <Col sm="12" key={cart.id}>
            <Card className="p-2 shadow-sm my-2">
              <Row>
                <Col sm="3">
                  <Image height="150" width="100%" style={{ objectFit: "cover" }} />
    
                </Col>
                
                <Col sm="8">
                  <p style={{ fontSize: "2 rem"}}><strong>{cart.user_name}</strong></p>                  
                  <p>In stock ({cart.quantity} items) </p>
                  
                </Col>
    
                <Col sm="1">
                  <div className="d-flex flex-column align-items-end justify-content-between" style={{ height: "150px"}}>
                    <Button size="sm" variant="light"><i className="fas fa-times text text-danger"></i></Button>
                  </div>
                </Col>
    
              </Row>
            </Card>
          </Col>
        ))} */}
      

    </Container>
  )
}

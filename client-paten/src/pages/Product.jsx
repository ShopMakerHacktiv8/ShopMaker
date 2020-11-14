import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { listProduct } from '../store/actions/productActions';

export default function Product() {

  let match = useRouteMatch()
  console.log(match, '<=== match url');
  let url = "/" + match.url.split("/")[1]
  console.log(url, '<=== url split');

  const { products, loading, error } = useSelector(
    state => state.productListReducer
  )
  // console.log(products, '<== products ');
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProduct())
  }, []) 
   
  return (
    <Container>
      <Button as={Link} to={`${url}/add-product`}>
        Add Product
      </Button>
      <Row>
        <Col sm="4">

          <Card>
            <Card.Img variant="top"  />
            <Card.Body>
              <Card.Title>hahah</Card.Title>
              <Card.Text>
                
              </Card.Text>
              <Button variant="primary">Edit</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      { JSON.stringify(products) }
    </Container>
  )
}

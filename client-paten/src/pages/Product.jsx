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
      <div className="d-flex align-items-center justify-content-center mt-3 mb-3">
        <Button as={Link} to={`${url}/add-product`}>
          Add Product
        </Button>
      </div>

      <Row>
        { products && products.map(product => {
          return (
            <Col sm="4" key={product.id}>
              <Card  className="shadow">
                <Card.Img variant="top" src={product.image_url} className="shadow" style={{ height: 250, weight: 250}} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                      {product.description}
                  </Card.Text>
                  <Card.Subtitle>Price: {product.price}</Card.Subtitle> <br />
                  <Card.Subtitle>Stock: {product.stock}</Card.Subtitle>
                  <div className="d-flex align-items-center justify-content-center">
                    <Button variant="primary">Edit</Button>
                    <Button variant="danger">Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        
        })}
      </Row>
      {/* { JSON.stringify(products) } */}
    </Container>
  )
}

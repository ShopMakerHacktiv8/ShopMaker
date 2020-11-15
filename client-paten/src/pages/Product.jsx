import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
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
            <ProductItem 
              key={product.id}
              product={product}
            />
            
          )
        
        })}
      </Row>
      {/* { JSON.stringify(products) } */}
    </Container>
  )
}

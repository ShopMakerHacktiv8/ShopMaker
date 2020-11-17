import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import { listCategory } from '../store/actions/categoryAction';
import { listProduct } from '../store/actions/productActions';

export default function Product() {
  let match = useRouteMatch()
  console.log(match, '<=== match url');
  let url = "/" + match.url.split("/")[1]
  console.log(url, '<=== url split');

  const { products, loading, error } = useSelector(
    state => state.productListReducer
  )

  const { categories } = useSelector(
    (state) => state.categoryListReducer
  )
  // console.log(products, '<== products ');
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProduct())
    dispatch(listCategory())
  }, [])

  function handleCategoryOnChange(e) {
    const category_id = e.target.value
    dispatch(listProduct(category_id))
    console.log(category_id)
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h3>Product List</h3>

        <Form.Control className="w-25" as="select" name="category_id" onChange={handleCategoryOnChange}>
          <option value="" >Select Category</option>
          {categories && categories.map(category => {
            return (
              <option key={category.id} value={category.id}>{category.name}</option>
            )

          })}
        </Form.Control>
        <Button as={Link} to={`${url}/add-product`}>
          Add Product
        </Button>
      </div>

      <Row>
        {products && products.map(product => {
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

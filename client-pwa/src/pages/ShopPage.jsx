import React, { useEffect } from 'react'
import { Card, Row, Col, Container, Button, Image, Form } from 'react-bootstrap'
import ItemCard from '../components/ItemCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from '../store/actions/productActions'
import { listCategory } from '../store/actions/categoryActions'

const ShopPage = () => {
  const { shopId } = useParams()
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(
    (state) => state.productListReducer
  )
  const { categories } = useSelector((state) => state.categoryListReducer)

  useEffect(() => {
    dispatch(listProduct(shopId))
    dispatch(listCategory(shopId))
  }, [])

  function handleCategoryOnChange(e) {
    const categoryId = e.target.value
    dispatch(listProduct(shopId, categoryId))
    console.log(categoryId)
  }

  return (
    <Container fluid className='pt-5'>
      <Form.Control
        className='w-100 mt-5'
        as='select'
        name='category_id'
        onChange={handleCategoryOnChange}
      >
        <option value=''>Select Category</option>
        {categories &&
          categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )
          })}
      </Form.Control>
      <Row>
        {products &&
          products.map((product) => (
            <ItemCard key={product.id} item={product} />
          ))}
      </Row>
    </Container>
  )
}

export default ShopPage

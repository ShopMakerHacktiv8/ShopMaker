import React, { useEffect } from 'react'
import { Card, Row, Col, Container, Button, Image } from 'react-bootstrap'
import ItemCard from '../components/ItemCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from '../store/actions/productActions'

const ShopPage = () => {
  const { shopId } = useParams()
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(
    (state) => state.productListReducer
  )

  useEffect(() => {
    dispatch(listProduct(shopId))
  }, [])

  return (
    <Container fluid>
      <Row className='mt-3'>
        {products &&
          products.map((product) => (
            <ItemCard key={product.id} item={product} />
          ))}
      </Row>
    </Container>
  )
}

export default ShopPage

import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../store/actions/productActions'


export default function ProductItem({ product }) {
  const dispatch = useDispatch()

  function handleDelete() {
    console.log('masukkk delete handler');
    dispatch(deleteProduct(product.id))
  }

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
              <Button onClick={handleDelete} variant="danger">Delete</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
  )
}

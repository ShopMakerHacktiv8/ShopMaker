import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row, Card, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../store/actions/productActions'


export default function ProductItem({ product }) {
  const dispatch = useDispatch()

  function handleDelete() {
    console.log('masukkk delete handler');
    dispatch(deleteProduct(product.id))
  }

  return (
      <Col sm="12" key={product.id}>
        <Card className="p-2 shadow-sm my-2">
          <Row>
            <Col sm="3">
              <Image height="150" width="100%" style={{ objectFit: "cover" }} src={product.image_url} />

            </Col>
            
            <Col sm="8">
              <p style={{ fontSize: "2 rem"}}><strong>{product.name}</strong></p>
              <p className="bg-secondary">Rp. {product.price.toLocaleString("en-US").replaceAll(",", ".")}</p> 
              <p>In stock ({product.stock} items)</p>
            </Col>

            <Col sm="1">
              <div className="d-flex flex-column align-items-end justify-content-between" style={{ height: "150px"}}>
                <Button onClick={handleDelete} size="sm" variant="light"><i className="fas fa-times text text-danger"></i></Button>
                <Button variant="light" size="sm"><i className="fas fa-pen-fancy"></i></Button>
              </div>
            </Col>

          </Row>
        </Card>
      </Col>
  )
}

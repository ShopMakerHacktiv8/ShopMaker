import React from 'react'
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'



export default function EditProduct() {
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  
  return (
<Container>
      <Form className="mt-5">
        <h5 className="text-center">Show your product and made a tons of order!</h5>
        <Row>
          <Col sm='12'>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your product name"
                name="name"
                ref={register({ required: 'Name is required'})}
                isInvalid={errors.name}
              />
              { errors.name && (
                <Form.Text as='div' className = 'text text-danger'>
                  { errors.name.message }
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col sm='12'>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your product description"
                name="description"
                ref={register({ required: 'description is required'})}
                isInvalid={errors.description}
              />
              { errors.description && (
                <Form.Text as='div' className = 'text text-danger'>
                  { errors.description.message }
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          
          <Col sm='4'>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your product price"
                name="price"
                ref={register({ required: 'Price is required'})}
                isInvalid={errors.price}
              />
              { errors.price && (
                <Form.Text as='div' className = 'text text-danger'>
                  { errors.price.message }
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col sm='4'>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your product stock"
                name="stock"
                ref={register({ required: 'Stock is required'})}
                isInvalid={errors.stock}
              />
              { errors.stock && (
                <Form.Text as='div' className = 'text text-danger'>
                  { errors.stock.message }
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          
          <Col sm='4'>
            <Form.Group>
              <Form.File
                ref={register}
                id='exampleFormControlFile1'
                label='Product Image'
                name='picture'
              />
            </Form.Group>
          </Col>

        </Row>
          <div className="d-flex align-items-center justify-content-center">
            <Button variant='primary' type='submit'>Create product</Button>
          </div>
      </Form>
    </Container>
  )
}

import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row, Card, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct, getByIdProduct } from '../store/actions/productActions'
import { Link, useHistory, useParams } from 'react-router-dom'
import { listCategory } from '../store/actions/categoryAction'
import Loader from '../components/Loader'



export default function EditProduct() {
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  const history = useHistory()

  const { product_id } = useParams()
  
  const editState  = useSelector(
    state => state.productEditReducer
  )

  const { categories } = useSelector(
    state => state.categoryListReducer
  )

  const { product } = useSelector(
    state => state.productGetByIdReducer
  )
  const onSubmit = (data) => {
    console.log('abc')
    const file = data.picture[0]
    const formData = new FormData()
    formData.append('file', file)
    
    formData.append('name', data.name)
    formData.append('stock', data.stock)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('category_id', data.category_id)

    dispatch(editProduct(product_id, formData))
  }

  useEffect(() => {
    if (editState.success) {
      history.push('/home/products')
    }
  }, [editState.success])

  useEffect(() => {
    dispatch(listCategory())
    dispatch(getByIdProduct(product_id))
  }, [])

  return (
    <Container>
      { (editState.errors && editState.errors.length) ? <Alert variant="danger" className="mt-2">
        { editState.errors[0] }
      </Alert> : 
      <>
      </>
       }
      { editState.loading ? <Loader /> : 
      
      <>
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <h5 className="text-center">Edit Product</h5>
          { product && product.name && (
          <>
            <Row>
              <Col sm='6'>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your product name"
                    name="name"
                    ref={register({ required: 'Name is required'})}
                    isInvalid={errors.name}
                    defaultValue={product.name}
                  />
                  { errors.name && (
                    <Form.Text as='div' className = 'text text-danger'>
                      { errors.name.message }
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>

              <Col sm="6">
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" name="category_id" ref={register}>
                    { categories && categories.map(category => {
                      return (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      )

                    })}
                  </Form.Control>
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
                    defaultValue={product.description}
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
                    defaultValue={product.price}
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
                    defaultValue={product.stock}
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
            <Row>
              <Col sm="6">
              <Button variant='danger' className="w-100" as={Link} to={"/home/products"}>Cancel</Button>

              </Col>
              <Col cm="6">
              <Button variant='primary' type='submit' className="w-100">Submit</Button>
              </Col>
            </Row>
          </>
          )}
        </Form>
      </>
      }
  
    </Container>
  )
}

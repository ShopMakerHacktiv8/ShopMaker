import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { createCategory } from '../store/actions/categoryAction'
import { listCategory } from '../store/actions/categoryAction'
import { deleteCategory } from '../store/actions/categoryAction'

export default function Category() {
  
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()

  const { categories, loading, error } = useSelector(
    (state) => state.categoryListReducer
  )

  useEffect(() => {
    dispatch(listCategory())
  }, [])

  const onSubmit = (data) => {
    console.log('masuk onsubmit')
    dispatch(createCategory(data.name))
  }

  function handleDelete(id) {
    console.log('msukkk delete handler')
    dispatch(deleteCategory(id))
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} className="pt-5">
        <Row className="d-flex align-items-center">
          <Col sm="6">
            <h3>Category</h3>
            <Form.Group> 
              <Form.Control
                type="text"
                placeholder="Enter category"
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
          <Col>
            <Button variant='primary' type='submit' className="mt-4"><i className="fas fa-plus"></i></Button>
          </Col>
        </Row>
      </Form>
      
      { categories && categories.map(category => (
        
        <Button 
          key={category.id} 
          variant="outline-primary" 
          size="sm"
          className="mr-2"
          onClick={() => {handleDelete(category.id)}}
          >
            {category.name}
        </Button>
      ))}
      {/* { JSON.stringify(categories) } */}
    </Container>
  )
}

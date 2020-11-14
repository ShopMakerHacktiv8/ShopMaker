import React, { useEffect } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetRegister, signUp } from '../store/actions/shopActions'

function Register({ history }) {
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()

  const { loading, error, success } = useSelector(
    (state) => state.shopRegisterReducer
  )

  useEffect(() => {
    if (success) {
      history.push('/login')
      dispatch(resetRegister())
    }
  }, [history, success])

  const onSubmit = (data) => {
    console.log('abc')
    const file = data.picture[0]
    const formData = new FormData()
    formData.append('file', file)

    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('name', data.name)
    formData.append('address', data.address)
    formData.append('phone', data.phone)
    formData.append('description', data.description)

    dispatch(signUp(formData))
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='mb-3 mt-5'>Sign Up</h2>
        <p>Please fill in this form to create an account.</p>
        <Row>
          <Col sm='12'>
            <Form.Group controlId='form.email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                ref={register({ required: 'Email is required' })}
                isInvalid={errors.email}
              />
              {errors.email && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col sm='12'>
            <Form.Group controlId='form.password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                name='password'
                ref={register({ required: 'Password is required' })}
                isInvalid={errors.name}
              />
              {errors.password && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col sm='6'>
            <Form.Group controlId='form.name'>
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter shop name'
                name='name'
                ref={register({ required: 'Shop name is required' })}
                isInvalid={errors.name}
              />
              {errors.name && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.name.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col sm='6'>
            <Form.Group controlId='form.phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='phone'
                placeholder='Enter phone number'
                name='phone'
                ref={register({ required: 'Phone number is required' })}
                isInvalid={errors.phone}
              />
              {errors.phone && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.phone.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col sm='6'>
            <Form.Group controlId='form.description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter description'
                rows={3}
                name='description'
                ref={register({ required: 'Description is required' })}
                isInvalid={errors.description}
              />
              {errors.description && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.description.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col sm='6'>
            <Form.Group>
              <Form.File
                ref={register}
                id='exampleFormControlFile1'
                label='Shop Icon'
                name='picture'
              />
            </Form.Group>
          </Col>

          <Col sm='12'>
            <Form.Group controlId='form.address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                name='address'
                ref={register({ required: 'Address is required' })}
                isInvalid={errors.address}
              />
              {errors.address && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.address.message}
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Button variant='primary' type='submit'>
          Create
        </Button>
      </Form>
      <hr />
      <div className='d-flex align-items-center'>
        <div>Already have an account?</div>
        <Button variant='secondary' className='px-2' as={Link} to='/login'>
          Login
        </Button>
      </div>
    </Container>
  )
}

export default Register

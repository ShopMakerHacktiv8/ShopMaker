import React, { useEffect, useState } from 'react'
import { Button, Form, Container, Col, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { addUserDetails } from '../store/actions/userActions'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

function PaymentPage() {
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = async (data) => {
    dispatch(
      addUserDetails({
        name: data.name,
        address: data.address,
        phone: data.phone,
      })
    )
    history.goBack()
  }

  return (
    <>
      <Container className='my-5'>
        <Form onSubmit={handleSubmit(onSubmit)} className='pt-5'>
          <Form.Group>
            <h3 className='mb-3 mt-3'>Login</h3>
            <Form.Group controlId='form.name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your name'
                name='name'
                ref={register({ required: 'Name is required' })}
                isInvalid={errors.name}
              />
              {errors.name && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.name.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='form.phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter phone number'
                name='phone'
                ref={register({ required: 'Phone is required' })}
                isInvalid={errors.name}
              />
              {errors.phone && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.phone.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='form.address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your address'
                name='address'
                ref={register({ required: 'Address is required' })}
                isInvalid={errors.name}
              />
              {errors.address && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.address.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button className='w-100' variant='primary' type='submit'>
              Save
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  )
}
export default PaymentPage

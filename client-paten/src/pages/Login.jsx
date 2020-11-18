import React, { useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { login } from '../store/actions/shopActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

function Login({ history }) {
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()

  const { loading, error, shopInfo } = useSelector(
    (state) => state.shopLoginReducer
  )

  useEffect(() => {
    if (shopInfo && shopInfo.name) {
      history.push('/home')
    }
  }, [history, shopInfo])

  const onSubmit = async (data) => {
    dispatch(login(data.email, data.password))
  }

  return (
    <Container>
      { loading ? <Loader /> :
        <>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <h2 className='mb-3 mt-5'>Login</h2>

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

              <Button variant='primary' type='submit'>
                Login
              </Button>
            </Form.Group>
          </Form>
          <hr />
          <div className='d-flex align-items-center'>
            <div>Don't have an account?</div>
            <Button variant='secondary' className='px-2' as={Link} to='/register'>
              Register
            </Button>
          </div>
        </>
      }
    </Container>
  )
}

export default Login

import React, { useEffect, useState } from 'react'
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Card,
  Image,
  Modal,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteProduct, editProduct } from '../store/actions/productActions'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

export default function ProductItem({ product }) {
  const dispatch = useDispatch()
  let match = useRouteMatch()
  console.log(match, '<=== match url')
  let url = '/' + match.url.split('/')[1]
  console.log(url, '<=== url split')

  function handleDelete() {
    console.log('masukkk delete handler')
    dispatch(deleteProduct(product.id))
  }

  function handleEdit() {
    console.log('masukkk edit handler')
    // dispatch(editProduct(product.id))
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Col sm='12' key={product.id}>
      <Card className='p-2 shadow-sm my-2'>
        <Row>
          <Col sm='3'>
            <Image
              height='150'
              width='100%'
              style={{ objectFit: 'cover' }}
              src={product.image_url}
            />
          </Col>

          <Col sm='8'>
            <p style={{ fontSize: '2 rem' }}>
              <strong>{product.name}</strong>
            </p>
            <p className='bg-secondary'>
              Rp. {product.price.toLocaleString('en-US').replaceAll(',', '.')}
            </p>
            <p>In stock ({product.stock} items)</p>
          </Col>

          <Col sm='1'>
            <div
              className='d-flex flex-column align-items-end justify-content-between'
              style={{ height: '150px' }}
            >
              <Button onClick={handleShow} size='sm' variant='light'>
                <i className='fas fa-times text text-danger'></i>
              </Button>
              <Button
                as={Link}
                to={`${url}/edit-product/${product.id}`}
                onClick={handleEdit}
                variant='light'
                size='sm'
              >
                <i className='fas fa-pen-fancy'></i>
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure Want to Delete?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
          <Button variant='primary' onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  )
}

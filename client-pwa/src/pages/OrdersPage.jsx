import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import OrderCard from '../components/OrderCard'

const OrdersPage = () => {
  const { orders } = useSelector((state) => state.orderHistoryReducer)
  return (
    <Container fluid className='pt-5'>
      <div className='pt-5'></div>
      <h3>Order History</h3>
      {orders && orders.map((order) => <OrderCard order={order} />)}
    </Container>
  )
}

export default OrdersPage

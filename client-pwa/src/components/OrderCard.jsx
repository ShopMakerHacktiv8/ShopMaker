import React from 'react'
import { Card } from 'react-bootstrap'

const OrderCard = ({ order }) => {
  return (
    <Card className='p-2 shadow my-3' border='success'>
      <Card.Title>{order.product}</Card.Title>
      <Card.Subtitle>
        Total {order.quantity} x {order.price} = {order.total}
      </Card.Subtitle>
      <Card.Text>{order.address}</Card.Text>
    </Card>
  )
}

export default OrderCard

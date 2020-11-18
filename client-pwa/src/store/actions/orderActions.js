import {
  ORDER_HISTORY_ADD,
  ORDER_HISTORY_RESET,
} from '../constants/orderConstants'

export const addOrderHistory = (order) => async (dispatch, getState) => {
  const { orderHistoryReducer } = getState()
  const { orders } = orderHistoryReducer

  const newOrders = [...orders]
  newOrders.unshift(order)

  localStorage.setItem('orders', JSON.stringify(newOrders))
  dispatch({ type: ORDER_HISTORY_ADD, payload: order })
}

export const resetOrderHistory = () => async (dispatch) => {
  localStorage.removeItem('orders')
  dispatch({ type: ORDER_HISTORY_RESET })
}

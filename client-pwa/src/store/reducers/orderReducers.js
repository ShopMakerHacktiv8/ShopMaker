import {
  ORDER_HISTORY_ADD,
  ORDER_HISTORY_RESET,
} from '../constants/orderConstants'

export const orderHistoryReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_HISTORY_ADD:
      const newOrders = [...state.orders]
      newOrders.unshift(action.payload)
      return { orders: newOrders }
    case ORDER_HISTORY_RESET:
      return { orders: null }
    default:
      return state
  }
}

import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL
} from '../constants/cartConstants'

export const cartListReducer = (
  state = { loading: false, success: false, carts: [], errors: []}, action
) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true }
    case CART_LIST_SUCCESS:
      return { loading: false, success: true, carts: action.payload }
    case CART_LIST_FAIL:
      return { loading: false, carts: [], errors: action.payload }
    default:
      return state
  }
}
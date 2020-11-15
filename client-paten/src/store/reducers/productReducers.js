import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL
} from '../constants/productConstants'

export const productCreateReducer = (
  state = { loading: false, success: false, product: {}, errors: []}, action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, product: {}, errors: action.payload }
    case PRODUCT_CREATE_RESET:
      return { loading: false, success: false, product: {}, errors: [] }
    default:
      return state
  }
}

export const productListReducer = (
  state = { loading: false, products: [], errors: []}, action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, products: [], errors: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (
  state = { loading: false, product: {}, errors: []}, action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, message: 'delete product success' }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, message: 'delete product failed', errors: action.payload }
    default:
      return state
  }
}

export const productEditReducer = (
  state = { loading: false, product: {}, errors: []}, action
) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { loading: true }
    case PRODUCT_EDIT_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_EDIT_FAIL:
      return { loading: false, product: {}, errors: action.payload }
    default:
      return state
  }
}
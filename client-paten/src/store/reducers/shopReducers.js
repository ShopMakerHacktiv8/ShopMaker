import {
  SHOP_LOGIN_FAIL,
  SHOP_LOGIN_REQUEST,
  SHOP_LOGIN_SUCCESS,
  SHOP_LOGOUT,
  SHOP_REGISTER_FAIL,
  SHOP_REGISTER_REQUEST,
  SHOP_REGISTER_RESET,
  SHOP_REGISTER_SUCCESS,
} from '../constants/shopConstants'

export const shopLoginReducer = (
  state = { loading: false, shopInfo: {}, errors: [] },
  action
) => {
  switch (action.type) {
    case SHOP_LOGIN_REQUEST:
      return { loading: true }
    case SHOP_LOGIN_SUCCESS:
      return { loading: false, shopInfo: action.payload }
    case SHOP_LOGIN_FAIL:
      return { loading: false, shopInfo: {}, errors: action.payload }
    case SHOP_LOGOUT:
      return { loading: false, shopInfo: {}, errors: [] }
    default:
      return state
  }
}

export const shopRegisterReducer = (
  state = { loading: false, success: false, errors: [] },
  action
) => {
  switch (action.type) {
    case SHOP_REGISTER_REQUEST:
      return { loading: true }
    case SHOP_REGISTER_SUCCESS:
      return { loading: false, success: true }
    case SHOP_REGISTER_FAIL:
      return { loading: false, errors: action.payload }
    case SHOP_REGISTER_RESET:
      return { loading: false, success: false, errors: [] }
    default:
      return state
  }
}

import {
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
} from '../constants/shopConstants'

export const shopDetailsReducer = (
  state = { loading: false, shop: {}, errors: [] },
  action
) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { loading: true, ...state }
    case SHOP_DETAILS_SUCCESS:
      return { loading: false, shop: action.payload }
    case SHOP_DETAILS_FAIL:
      return { loading: false, shop: {}, errors: action.payload }
    default:
      return state
  }
}

import axios from '../../config/axios'

import {
  CART_LIST_FAIL,
  CART_LIST_SUCCESS,
  CART_LIST_REQUEST
} from '../constants/cartConstants'

export const listCart = (id) => async (dispatch, getState) => {
  console.log('masuk list cart di action')
  try {
    dispatch({
      type: CART_LIST_REQUEST
    })
  
    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    console.log(shopInfo.id, '<=== shop info id')
    const { data } = await axios.get(`/shops/${id}/carts`)

    dispatch({
      type: CART_LIST_SUCCESS,
      payload: data
    })

    console.log(data, '<=== cart list')
  } catch (error) {
    console.log(error, '<==== data list cart di action')
    dispatch({
      type: CART_LIST_FAIL,
      payload: 
        error.response && error.response.data.errors
        ? error.response.data.errors
        : ['error unknown'],
    })
  }
}
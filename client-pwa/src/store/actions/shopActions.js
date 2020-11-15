import {
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
} from '../constants/shopConstants'

import axios from '../../config/axios'

export const getDetailsShop = (shopId) => async (dispatch, getState) => {
  console.log('masuk list product di actions')
  try {
    dispatch({
      type: SHOP_DETAILS_REQUEST,
    })
    const { data } = await axios.get(`/clients/${shopId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    dispatch({
      type: SHOP_DETAILS_SUCCESS,
      payload: data,
    })

    localStorage.setItem('shop', JSON.stringify(data))
    console.log(data, '<=== data details product di actions')
  } catch (error) {
    console.log(error, '<=== error details product')
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : ['error unknown'],
    })
  }
}

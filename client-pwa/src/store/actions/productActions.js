import axios from '../../config/axios'
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'

export const listProduct = (shopId) => async (dispatch, getState) => {
  console.log('masuk list product di actions')
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    })
    const { data } = await axios.get(
      '/products',
      {
        params: { shop_id: shopId },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })

    console.log(data, '<=== data list product di actions')
  } catch (error) {
    console.log(error, '<=== error add product')
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : ['error unknown'],
    })
  }
}

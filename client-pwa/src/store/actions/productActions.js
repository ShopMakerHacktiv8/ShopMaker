import axios from '../../config/axios'
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'

export const listProduct = (shopId, category_id) => async (
  dispatch,
  getState
) => {
  console.log('masuk list product di actions')
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    })

    // const { data } = await axios.get('/products', {
    //   params: { shop_id: shopInfo.id, category_id: category_id || null },
    // })

    const { data } = await axios.get(
      '/products',
      {
        params: { shop_id: shopId, category_id: category_id || null },
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

export const getDetailsProduct = (productId) => async (dispatch, getState) => {
  console.log('masuk list product di actions')
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    })
    const { data } = await axios.get(`/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })

    console.log(data, '<=== data details product di actions')
  } catch (error) {
    console.log(error, '<=== error details product')
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : ['error unknown'],
    })
  }
}

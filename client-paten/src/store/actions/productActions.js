import axios from '../../config/axios'
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from '../constants/productConstants'

export const createProduct = (formData) => async (dispatch, getState) => {
  console.log('masuk add product di actions')
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    })
    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    const { data } = await axios.post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'access_token': shopInfo.access_token   
      }
    })

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    })

    console.log(data, '<=== data add product di actions')

  } catch (error) {
    console.log(error, '<=== error add product')
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: 
        error.response && error.response.data.errors
        ? error.response.data.errors
        : ['error unknown'],
    })
  }
}

export const listProduct = () => async (dispatch, getState) => {
  console.log('masuk list product di actions')
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST
    })
    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    console.log(shopInfo.id, '<=== shop info id')
    const { data } = await axios.get('/products', {
      params: { shop_id: shopInfo.id },
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // const { data } = await axios({
    //   method: 'get',
    //   url: '/products',
    //   data: {
    //     shop_id: shopInfo.id
    //   }
    // })
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
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

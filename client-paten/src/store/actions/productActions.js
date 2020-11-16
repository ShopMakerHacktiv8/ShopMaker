import axios from '../../config/axios'
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_RESET,
  PRODUCT_GETBYID_REQUEST,
  PRODUCT_GETBYID_FAIL,
  PRODUCT_GETBYID_SUCCESS
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

    dispatch({
      type: PRODUCT_CREATE_RESET
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

export const editProduct = (id, formData) => async (dispatch, getState) => {
  console.log('masuk edit product di action')
  console.log(id, '<=== id di edit prodduct')
  try {
    dispatch({
      type: PRODUCT_EDIT_REQUEST
    })
    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    const { data } = await axios.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'access_token': shopInfo.access_token
      }
    })

    dispatch({
      type: PRODUCT_EDIT_SUCCESS,
      payload: data,
    })

    dispatch({
      type: PRODUCT_EDIT_RESET
    })

    console.log(data, '<=== data edit product di actions')
  } catch (error) {
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: 
        error.response && error.response.data.errors
        ? error.response.data.errors
        : ['error unknown'],
    })
  }
}

export const listProduct = (category_id) => async (dispatch, getState) => {
  console.log('masuk list product di actions')
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST
    })
    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    console.log(shopInfo.id, '<=== shop info id')
    
    const { data } = await axios.get('/products', {
      params: { shop_id: shopInfo.id, category_id: category_id || null },
    })

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

export const deleteProduct = (productId) => async (dispatch, getState) => {
  console.log('masuk delete product di action')
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    })
    
    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    console.log(shopInfo.id, '<=== shop info id di delete action')
    const { data } = await axios.delete(`/products/${productId}`, {
      headers: {
        'Content-Type' : 'application/json',
        'access_token': shopInfo.access_token
      }
    })

    dispatch({
      type: PRODUCT_DELETE_SUCCESS
    })

    dispatch(listProduct())

    console.log(data, '<=== delete product di action')
  } catch (error) {
    console.log(error, '<=== error delete product')
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: 
        error.response && error.response.data.errors
        ? error.response.data.errors
        : ['error unknown'],
    })   
  }
}

export const getByIdProduct = (productId) => async (dispatch, getState) => {
  console.log('masuk get by id product di action')
  try {
    dispatch({
      type: PRODUCT_GETBYID_REQUEST
    })
    const { data } = await axios.get(`/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    dispatch({
      type: PRODUCT_GETBYID_SUCCESS,
      payload: data,
    })

    console.log(data, '<==== get by id product di action')
  } catch (error) {
    console.log(error, '<==== error get by id product')
    dispatch({
      type: PRODUCT_GETBYID_FAIL,
      payload: 
        error.response && error.response.data.errors
        ? error.response.data.errors
        : ['error unknown'],
    })
  }
}
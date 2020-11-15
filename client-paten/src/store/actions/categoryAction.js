import axios from '../../config/axios'
import {
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST
} from '../constants/categoryConstants'

export const createCategory = (name) => async (dispatch, getState) => {
  console.log('masuk create category at action')
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST
    })
    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    const { data } = await axios.post('/categories', { name }, {
      headers: {
        'access_token': shopInfo.access_token
      }
    })

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data
    })

    dispatch(listCategory())

    console.log(data, '<== data create category at actions')
  } catch (error) {
    console.log(error, '<=== error create category')
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: 
        error.response && error.response.data.errors
        ? error.response.data.errors
        : ['error unknown'],
    })
  }
}

export const listCategory = () => async (dispatch, getState) => {
  console.log('masukkk list category')
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    })
    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    console.log(shopInfo.id, '<=== shop info id')
    const { data } = await axios.get('/categories', {
      params: { shop_id: shopInfo.id}
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data
    })

    console.log(data, '<=== data list category di action')

  } catch (error) {
    console.log(error, '<=== error get list category')
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: 
        error.response && error.response.data.errors
        ? error.response.data.errors
        : ['error unknown'],
    })
  }
}

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  console.log('masuk delete category')
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST
    })

    const { shopLoginReducer } = getState()
    const { shopInfo } = shopLoginReducer
    console.log(shopInfo.id, "<== shop info id di delete action ")
    const { data } = await axios.delete(`/categories/${categoryId}`, {
      headers: {
        'Content-Type': 'application/json',
        'access_token': shopInfo.access_token
      }
    })

    dispatch({
      type: CATEGORY_DELETE_SUCCESS
    })

    dispatch(listCategory())

    console.log(data, '<==== delete categori di action')
  } catch (error) {
    console.log(error, '<=== error delete categories')
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: 
        error.response && error.response.data.errors
        ? error.response.data.errors
        : ['error unknown'],
    })
    
  }
}
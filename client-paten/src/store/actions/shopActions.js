import axios from '../../config/axios'
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

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SHOP_LOGIN_REQUEST,
    })

    const { data } = await axios.post('/shops/login', { email, password })

    dispatch({
      type: SHOP_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('shopInfo', JSON.stringify(data))
  } catch (error) {
    console.log(error)
    dispatch({
      type: SHOP_LOGIN_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : ['error unknown'],
    })
  }
}

export const signUp = (formData) => async (dispatch) => {
  console.log('agb')
  try {
    dispatch({
      type: SHOP_REGISTER_REQUEST,
    })

    const { data } = await axios.post('/shops/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    dispatch({
      type: SHOP_REGISTER_SUCCESS,
    })

    console.log(data)
  } catch (error) {
    console.log(error)
    dispatch({
      type: SHOP_REGISTER_FAIL,
      payload:
        error.response && error.response.data.errors
          ? error.response.data.errors
          : ['error unknown'],
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('shopInfo')
  dispatch({ type: SHOP_LOGOUT })
}

export const resetRegister = () => (dispatch) => {
  dispatch({ type: SHOP_REGISTER_RESET })
}

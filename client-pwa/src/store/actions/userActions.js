import {
  USER_DETAILS_ADD,
  USER_DETAILS_RESET,
} from '../constants/userConstants'

export const addUserDetails = (user) => async (dispatch) => {
  localStorage.setItem('user', JSON.stringify(user))
  dispatch({ type: USER_DETAILS_ADD, payload: user })
}

export const resetUserDetails = () => async (dispatch) => {
  localStorage.removeItem('user')
  dispatch({ type: USER_DETAILS_RESET })
}

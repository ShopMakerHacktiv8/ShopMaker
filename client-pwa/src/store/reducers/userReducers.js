import {
  USER_DETAILS_ADD,
  USER_DETAILS_RESET,
} from '../constants/userConstants'

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_ADD:
      return { user: action.payload }
    case USER_DETAILS_RESET:
      return { user: null }
    default:
      return state
  }
}

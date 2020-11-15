import {
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL
} from '../constants/categoryConstants'

export const categoryCreateReducer = (
  state = { loading: false, category: {}, errors: []}, action
) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true }
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORY_CREATE_FAIL:
      return { loading: false, category: {}, errors: action.payload }
    default:
      return state
  } 
}

export const categoryListReducer = (
  state = { loading: false, categories: [], errors: []}, action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true }
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload }
    case CATEGORY_LIST_FAIL:
      return { loading: false, categories: [], errors: action.payload }
    default:
      return state
  }
}

export const categoryDeleteReducer = (
  state = { loading: false, category: {}, errors: []}, action
) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true }
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, category: action.payload }
    case CATEGORY_DELETE_FAIL:
      return { loading: false, category: {}, errors: action.payload }
    default:
      return state
  }
}
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from '../constants/categoryConstants'

import axios from '../../config/axios'

export const listCategory = (shop_id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
    })

    const { data } = await axios.get(
      '/categories',
      {
        params: { shop_id },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
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

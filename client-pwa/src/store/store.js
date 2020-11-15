import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'

import { shopDetailsReducer } from './reducers/shopReducers'

const reducer = combineReducers({
  productListReducer,
  productDetailsReducer,
  shopDetailsReducer,
})

const shopFromStorage = localStorage.getItem('shop')
  ? JSON.parse(localStorage.getItem('shop'))
  : {}

const initialState = {
  shopDetailsReducer: { shop: shopFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

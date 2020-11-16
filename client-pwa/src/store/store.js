import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { shopDetailsReducer } from './reducers/shopReducers'
import { userDetailsReducer } from './reducers/userReducers'
import { categoryListReducer } from './reducers/categoryReducers'
import { orderHistoryReducer } from './reducers/orderReducers'

const reducer = combineReducers({
  productListReducer,
  productDetailsReducer,
  shopDetailsReducer,
  userDetailsReducer,
  categoryListReducer,
  orderHistoryReducer,
})

const shopFromStorage = localStorage.getItem('shop')
  ? JSON.parse(localStorage.getItem('shop'))
  : {}

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const ordersFromStorage = localStorage.getItem('orders')
  ? JSON.parse(localStorage.getItem('orders'))
  : []

const initialState = {
  shopDetailsReducer: { shop: shopFromStorage },
  userDetailsReducer: { user: userFromStorage },
  orderHistoryReducer: { orders: ordersFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

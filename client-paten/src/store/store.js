import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { shopLoginReducer, shopRegisterReducer } from './reducers/shopReducers'
import { productCreateReducer, productListReducer, productDeleteReducer, productEditReducer } from './reducers/productReducers'
import { categoryCreateReducer, categoryListReducer, categoryDeleteReducer } from './reducers/categoryReducer'

const reducer = combineReducers({
  shopLoginReducer,
  shopRegisterReducer,
  productCreateReducer,
  productListReducer,
  productDeleteReducer,
  productEditReducer,
  categoryCreateReducer,
  categoryListReducer,
  categoryDeleteReducer
})

const shopInfoFromStorage = localStorage.getItem('shopInfo')
  ? JSON.parse(localStorage.getItem('shopInfo'))
  : {}

const initialState = {
  shopLoginReducer: { shopInfo: shopInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

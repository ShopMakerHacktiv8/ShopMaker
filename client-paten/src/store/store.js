import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { shopLoginReducer, shopRegisterReducer } from './reducers/shopReducers'
import { productCreateReducer, productListReducer, productDeleteReducer, productEditReducer, productGetByIdReducer } from './reducers/productReducers'
import { categoryCreateReducer, categoryListReducer, categoryDeleteReducer } from './reducers/categoryReducer'
import { cartListReducer } from './reducers/cartReducer'

const reducer = combineReducers({
  shopLoginReducer,
  shopRegisterReducer,
  productCreateReducer,
  productListReducer,
  productDeleteReducer,
  productEditReducer,
  productGetByIdReducer,
  categoryCreateReducer,
  categoryListReducer,
  categoryDeleteReducer,
  cartListReducer
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

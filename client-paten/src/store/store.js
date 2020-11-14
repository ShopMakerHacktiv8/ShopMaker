import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { shopLoginReducer, shopRegisterReducer } from './reducers/shopReducers'

const reducer = combineReducers({
  shopLoginReducer,
  shopRegisterReducer,
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

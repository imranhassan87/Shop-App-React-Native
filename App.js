import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import StoreNavigator from './Navigation/StoreNavigator'
import productsReducer from './Store/Reducers/Products'
import CartReducer from './Store/Reducers/Cart'
import OrdersReducer from './Store/Reducers/Orders'
import authReducer from './Store/Reducers/auth'


const rootReducer = combineReducers({
  products: productsReducer,
  Cart: CartReducer,
  Order: OrdersReducer,
  Auth:authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <StoreNavigator />
    </Provider>
  );
}


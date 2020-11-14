import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { shopInfo } = useSelector((state) => state.shopLoginReducer)
  return (
    <Route
      {...rest}
      render={() => {
        if (shopInfo && shopInfo.access_token) {
          return <Component />
        } else {
          return <Redirect to='/' />
        }
      }}
    />
  )
}

export default PrivateRoute

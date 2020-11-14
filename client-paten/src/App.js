import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NavbarHome from './components/NavbarHome'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
// import Product from './pages/Product'
import LandingPage from './pages/LandingPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <NavbarHome></NavbarHome>
        <Switch>
          <Route exact path='/' component={LandingPage} />

          <Route path='/login' component={Login} />

          <Route path='/register' component={Register} />

          <PrivateRoute path='/home' component={Home} />

          {/* <Route path='/product'>
          <Product></Product>
        </Route> */}
        </Switch>
      </Router>
    </>
  )
}

export default App
